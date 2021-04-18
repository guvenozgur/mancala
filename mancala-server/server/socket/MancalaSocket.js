const {serverSocketEvents, clientSocketEvents} = require('../../config/Mappings');
const gameService = require('../service/GameService')();
const {createPlayer, deletePlayer, getPlayer, getPlayerBySocketId} = require('../service/PlayerService');
const redisIo = require('socket.io-redis');
const {_auth} = require('../service/Authentication');
const config = require('../../config/Config');
const crypto = require('crypto');
const {cookieParser} = require('../util/util');


module.exports.initSocket = (socket)=>{
    socket.adapter(redisIo({
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
        requestTimeout: config.REDIS_REQ_TIMEOUT
    }));

    socket.use(async (socket, next) => {
        let token = cookieParser(socket.handshake.headers.cookie, 'mancalaToken');
        try {
            await _auth(token);
            console.log(`Token is validated: ${token}`);
            next();
        } catch (e) {
            console.log(`Token validation error: ${token}`);
            next(new Error("unauthorized"))
        }
    });



    socket.on('connection', async function (io) {
        console.log('Client connected...' + io.id);
        let token = cookieParser(io.handshake.headers.cookie, 'mancalaToken');
        let {username} = await _auth(token);
        let player;
        io.on(serverSocketEvents.CREATE, async function (data, callback) {
            try {
                player = await createPlayer(username, data.gameName, io.id);
                await gameService.createGame(data.gameName, player.playerId, '');
                callback();
            } catch (resp) {
                io.emit(clientSocketEvents.CREATE_RESP, resp.message);
            }

        });

        io.on(serverSocketEvents.JOIN, async function (data, callback) {
            try {
                player = await createPlayer(username, data.gameName, io.id);
                let resp = await gameService.join(data.gameName, username);
                let opponentSocketId = await getOpponentSocket(resp.game, username);
                let playerOneSocket = io.adapter.nsp.sockets[opponentSocketId];
                callback(resp);
                playerOneSocket.emit(clientSocketEvents.JOIN_RESP, resp);
            } catch (resp) {
                io.emit(clientSocketEvents.JOIN_RESP, resp.message);
            }
        });

        io.on(serverSocketEvents.GET_ALL_GAMES, async function (callback) {
            try {
                let resp = await gameService.getAllGames();
                callback(resp);
            } catch (resp) {
                io.emit(clientSocketEvents.GET_ALL_GAMES_RESP, resp.message);
            }

        });

        io.on(serverSocketEvents.MOVE, async function (data, callback) {
            try {
                let resp = await gameService.move(player.gameId, player.playerId, data.pitId);
                let game = await gameService.getGame(player.gameId);
                let opponentSocketId = await getOpponentSocket(game[0], player.playerId);
                let opponentSocket = io.adapter.nsp.sockets[opponentSocketId];
                callback(resp);
                opponentSocket.emit(clientSocketEvents.MOVE_RESP, resp);
            } catch (resp) {
                io.emit(clientSocketEvents.MOVE_RESP, resp.message);
            }
        });

        io.on(serverSocketEvents.DISCONNECT, async function (){
                   await deletePlayer(io.id);
            }
        );
    });
}

async function getOpponentSocket(game, playerId) {
    let opponentId = game.playerTwoId === playerId ? game.playerOneId : game.playerTwoId;

    let opponent = await getPlayer(opponentId);
    return opponent[0].socketId;
}