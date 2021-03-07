const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    gameId: {
        type: String,
        required: true,
        unique: true
    },
    playerOneId: {
        type: String,
        required: false
    },
    playerTwoId: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Game', gameSchema);

