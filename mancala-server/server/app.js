"use strict"

const express = require('express');
const app = express();
const config = require('../config/Config');
const server = require('http').Server(app);

const socket = require('socket.io')(server);
const PORT = process.env.PORT || config.SERVER_PORT;

const {serverSocketEvents, clientSocketEvents} = require('../config/Mappings');
const mongoose = require('mongoose');
const crypto = require("crypto");

const gameController = require('./controller/GameController');
const gameService = require('./service/GameService')
const playerService = require('./service/PlayerService')

const redisIo = require('socket.io-redis');
socket.adapter(redisIo({
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    requestTimeout: config.REDIS_REQ_TIMEOUT
}))


mongoose.connect(config.DATABASE_URL , {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection;

db.on('error', (err)=>{
    console.log(err)
})
db.on('open', ()=>{
    console.log('Mongo db connected');
})

app.use('/play', gameController());


socket.on('connection', function (io) {
    console.log('Client connected...' + io.id);

    io.on(serverSocketEvents.CREATE, async function (data){
        try{
            let playerId = crypto.randomBytes(32).toString('hex');;
            let player = await playerService().createPlayer(playerId, data.gameName, io.id);
            let resp = await gameService().createGame(data.gameName, player.playerId, '');
            io.emit(clientSocketEvents.CREATE_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.CREATE_RESP, resp.message);
        }

    });

    io.on(serverSocketEvents.JOIN, async function (data){
        try{
            let playerId = crypto.randomBytes(32).toString('hex');;
            let player = await playerService().createPlayer(playerId, data.gameName, io.id);
            let resp = await gameService().join(data.gameName, playerId);
            let opponentSocketId = await getOpponentSocket(resp.game, playerId);
            let playerOneSocket = io.adapter.nsp.sockets[opponentSocketId];
            io.emit(clientSocketEvents.JOIN_RESP, resp);
            playerOneSocket.emit(clientSocketEvents.JOIN_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.JOIN_RESP, resp.message);;
        }
    });

    io.on(serverSocketEvents.GET_ALL_GAMES, async function (){
        try{
            let resp = await gameService().getAllGames();
            io.emit(clientSocketEvents.GET_ALL_GAMES_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.GET_ALL_GAMES_RESP, resp.message);
        }

    });

    io.on(serverSocketEvents.MOVE, async function (data){
        try{
            let player = await playerService().getPlayerBySocketId(io.id);
            let resp = await gameService().move(player[0].gameId, player[0].playerId, data.pitId);
            let game = await gameService().getGame(player[0].gameId);
            let opponentSocketId = await getOpponentSocket(game[0], player[0].playerId);
            let opponentSocket = io.adapter.nsp.sockets[opponentSocketId];
            io.emit(clientSocketEvents.MOVE_RESP, resp);
            opponentSocket.emit(clientSocketEvents.MOVE_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.MOVE_RESP, resp.message);
        }
    });
});

async function getOpponentSocket(game, playerId){
    let opponentId = game.playerTwoId === playerId? game.playerOneId: game.playerTwoId;

    let opponent = await playerService().getPlayer(opponentId);
    return opponent[0].socketId;
}

server.listen(PORT);
