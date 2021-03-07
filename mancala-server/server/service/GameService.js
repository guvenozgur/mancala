const crypto = require("crypto");
const gameStates = require('../../config/GameStates');
const Game = require('../schema/game');
const PlayerService = require('../service/PlayerService')();
const {move, createGame} = require('../service/GamePlay')
const redisHelper = require('../cache/Helper')();

module.exports = ()=>{

    const self = {
        createGame: async(gameId, playerOneId, playerTwoId)=>{
            const game = new Game({
                gameId: gameId,
                playerOneId: playerOneId,
                playerTwoId: playerTwoId,
                state: gameStates.WAITING_FOR_PARTICIPANT
            });
            try {
                const newGame = await game.save();
                return newGame;
            } catch (err) {
                throw new Error('Not Suitable Game Name');
            }
        },

        join: async(gameId, playerTwoId)=>{
            try{
                let game = await self.getGame(gameId);
                game[0].state = gameStates.PLAYING;
                game[0].playerTwoId = playerTwoId;
                game[0].save();
                createGame(gameId, game[0].playerOneId, playerTwoId);
                return {id: game[0].playerTwoId, game: game[0]};
            }catch (err){
                throw new Error('Error: join game');
            }

        },

        move: async (gameId, player, selectedPitId)=>{
            try{
                let result = await move(gameId, player, selectedPitId);
                if(result.isWinner){
                    let game = await self.getGame(gameId);
                    game[0].state = gameStates.FINISH;
                    game[0].save();
                }
                return result;
            }catch (err){
                throw new Error('Move is not successful');
            }
        },

        getAllGames: async()=>{
            try {
                const games = await Game.find();
                return games;
            } catch (err) {
                throw new Error('Error: get all games');
            }
        },

        deleteGame: async()=>{
            try {
                let games = await self.getAllGames();
                games.forEach((game) => {
                    game.remove();
                });
                await redisHelper.clearGame();
               return ({message: 'Game deleted'})
            } catch (err) {
                throw new Error('Error: delete game');
            }
        },

        getGame: async(gameId)=>{
            let games;
            try {
                games = await Game.find({gameId: gameId});
                if(!games){
                    throw new Error('No game found')
                }
                return games;
            } catch (err) {
                throw new Error({message: err.message});
            }
        },
        getCachedGames: async()=>{
            let games = await redisHelper.getAllGames();
            return games;
        },
        deleteAllPlayers: async()=>{
            await PlayerService.deletePlayers();
        }

    }

    return self;
}
