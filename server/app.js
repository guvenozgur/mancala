"use strict"

const express = require('express');
const app = express();
const config = require('../config/Config');
const server = require('http').Server(app);

const socket = require('socket.io')(server);
const path = require('path');
const PORT = process.env.PORT || config.SERVER_PORT;

const {serverSocketEvents, clientSocketEvents} = require('../config/Mappings');
const mongoose = require('mongoose');


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



const gameController = require('./controller/GameController');

app.use(express.static(path.join(__dirname, '..', '/node_modules')));

app.get('/playerOne', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'client', 'playerOne.html'));
});

app.get('/playerTwo', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'client', 'playerTwo.html'));
});


app.use('/play', gameController());


const gameService = require('./service/GameService')
socket.on('connection', function (io) {
    console.log('Client connected...' + io.id);

    io.on(serverSocketEvents.CREATE, async function (data){
        try{
            let resp = await gameService().createGame(data.gameName, io.id, '');
            io.emit(clientSocketEvents.CREATE_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.CREATE_RESP, resp.message);
        }

    });

    io.on(serverSocketEvents.JOIN, async function (data){
        try{
            let resp = await gameService().join(data.gameName, io.id);
            let playerOneSocket = io.adapter.nsp.sockets[resp.game.playerOneId];
            io.emit(clientSocketEvents.JOIN_RESP, resp);
            playerOneSocket.emit(clientSocketEvents.JOIN_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.JOIN_RESP, resp.message);;
        }
    });

    io.on(serverSocketEvents.GET_ALL_GAMES, async function (data){
        try{
            let resp = await gameService().getAllGames();
            io.emit(clientSocketEvents.GET_ALL_GAMES_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.GET_ALL_GAMES_RESP, resp.message);
        }

    });

    io.on(serverSocketEvents.MOVE, async function (data){
        try{
            let resp = await gameService().move(data.gameId, io.id, data.pitId);
            let opponentSocketId;
            if(io.id === JSON.parse(resp.mancala).playerTwoId){
                opponentSocketId = JSON.parse(resp.mancala).playerOneId;
            }else {
                opponentSocketId = JSON.parse(resp.mancala).playerTwoId;
            }
            let opponentSocket = io.adapter.nsp.sockets[opponentSocketId];
            io.emit(clientSocketEvents.MOVE_RESP, resp);
            opponentSocket.emit(clientSocketEvents.JOIN_RESP, resp);
        }catch (resp){
            io.emit(clientSocketEvents.MOVE_RESP, resp.message);
        }
    });
});

server.listen(PORT);
