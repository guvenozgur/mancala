const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));
const redisClient = redis.createClient({host: 'localhost', port: 6379});
const config = require('../../config/Config');

module.exports = () => {

    /*
    *   Mancala Board
    *   {
    *       numberofPit: 12,
    *       numberofSeedPerPit: 6,
    *       playerOneId: 'p1',
    *       playerTwo:Id: 'p2',
    *       pits: {
    *           p1: {pits: [6, 6, 6, 6, 6, 6], treasure:0}
    *           p2: {pits: [6, 6, 6, 6, 6, 6], treasure:0}
    *       }
    *   }
    * */

    const self = {

        async upsertBoard(board, gameId){
            await redisClient.hmsetAsync(config.MANCALA_GAME_PREFIX, gameId, JSON.stringify(board));
        },

        async getBoard(gameId){
            let game = await redisClient.hmgetAsync(config.MANCALA_GAME_PREFIX, gameId);
            return JSON.parse(game);
        },

        async clearGame(gameID){
            await redisClient.del(config.MANCALA_GAME_PREFIX, gameID)
        }
    }
    return self;
}
