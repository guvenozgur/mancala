const Player = require('../schema/player');

module.exports.createPlayer = async (playerId, gameId, socketId) => {
    try {
        let player = new Player({
            playerId, gameId, socketId
        });
        const newPlayer = await player.save();
        return newPlayer;
    } catch (err) {
        throw new Error('Not Suitable Game Name');
    }
}

module.exports.getPlayer = async (playerId) => {
    try {
        const players = await Player.find({playerId});
        return players;
    } catch (err) {
        throw new Error('Error: get all games');
    }
}

module.exports.getPlayerBySocketId = async (socketId) => {
    try {
        const players = await Player.find({socketId});
        return players;
    } catch (err) {
        throw new Error('Error: get all games');
    }
}

module.exports.deletePlayers = async () => {
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


module.exports.deletePlayer = async (socketId)=>{
    try{
        let player = await Player.find({socketId});
        if(player) player.remove();
    }catch (e){
        throw new Error('Error when deleting player')
    }
}

