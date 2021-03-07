const Player = require('../schema/player');

module.exports = ()=>{

    const self = {
        createPlayer: async(playerId, gameId, socketId)=>{
            try {
                let player = await self.getPlayerBySocketId(socketId);
                if(player && player[0]){
                    return player[0];
                }
                player = new Player({
                    playerId, gameId, socketId
                });
                const newPlayer = await player.save();
                return newPlayer;
            } catch (err) {
                throw new Error('Not Suitable Game Name');
            }
        },

        getPlayer: async(playerId)=>{
            try {
                const players = await Player.find({playerId});
                return players;
            } catch (err) {
                throw new Error('Error: get all games');
            }
        },

        getPlayerBySocketId: async(socketId)=>{
            try {
                const allplayers = await Player.find();
                const players = await Player.find({socketId});
                return players;
            } catch (err) {
                throw new Error('Error: get all games');
            }
        },

        deletePlayers: async()=>{
            try {
                let players = await Player.find();
                players.forEach((player) => {
                    player.remove();
                });
                return ({message: 'Player deleted'})
            } catch (err) {
                throw new Error('Error: delete player');
            }
        }

    }

    return self;
}
