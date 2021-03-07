const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));
const redisClient = redis.createClient({host: 'localhost', port: 6379});
const config = require('../../config/Config');

const self = {

    /*
    *   Mancala Board
    *   {
    *       numberofPit: 12,
    *       numberofSeedPerPit: 6,
    *       playerOneId: 'p1',
    *       playerTwoId: 'p2',
    *       pits: {
    *           p1: {pits: [6, 6, 6, 6, 6, 6], treasure:0},
    *           p2: {pits: [6, 6, 6, 6, 6, 6], treasure:0}
    *       }
    *   }
    * */



    async upsertBoard(board, gameId) {
        await redisClient.hmsetAsync(config.MANCALA_GAME_PREFIX, gameId, JSON.stringify(board));
    },

    async getBoard(gameId) {
        let game = await redisClient.hmgetAsync(config.MANCALA_GAME_PREFIX, gameId);
        return JSON.parse(game);
    },

    async clearGame() {
        await redisClient.del(config.MANCALA_GAME_PREFIX)
    },

    async getAllGames(gameId) {
        let game = await redisClient.hgetallAsync(config.MANCALA_GAME_PREFIX)
        return game;
    }


}

module.exports = self;
