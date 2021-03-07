"use strict"

module.exports.routeMappings = {
    JOIN: '/join/:gameName',
    MOVE: '/move',
    CREATE: '/create/:gameName',
    GET_ALL_GAMES: '/getAllGames',
    DELETE_GAMES: '/deleteGame',
    GET_CACHED_GAMES:'/getCachedGames',
    DELETE_ALL_PLAYERS: '/deleteAllPlayers'
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
    MOVE_RESP: 'moveResp',
    CREATE_RESP: 'createResp',
    GET_ALL_GAMES_RESP: 'getAllGamesResp',
    DELETE_GAME_RESP: 'deleteGameResp'
}