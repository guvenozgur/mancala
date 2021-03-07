const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true,
        unique: true
    },
    socketId:{
        type: String,
        required: true,
    },
    gameId:{
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Player', playerSchema);
