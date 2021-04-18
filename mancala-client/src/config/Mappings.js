"use strict"

module.exports.routeMappings = {
    JOIN: '/join/:gameName',
    MOVE: '/move',
    CREATE: '/create/:gameName',
    GET_ALL_GAMES: '/getAllGames',
    DELETE_GAME: '/deleteGame/:gameName'
}

module.exports.serverSocketEvents = {
    JOIN: 'join',
    MOVE: 'move',
    CREATE: 'create',
    GET_ALL_GAMES: 'getAllGames',
    DELETE_GAME: 'deleteGame'
}

module.exports.clientSocketEvents = {
    JOIN_RESP: 'joinResp',
    MOVE_RESP: 'moveResp'
}

module.exports.socketConfs = {
    socketUrl: 'http://localhost:4000/'
}

module.exports.paths = {
    LOGIN: 'auth/login'
}