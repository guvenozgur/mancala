function Mancala(numberOfPit, numberOfSeedPerPit, playerOneId, playerTwoId) {
    this.numberOfPit = numberOfPit;
    this.numberOfSeedPerPit = numberOfSeedPerPit;
    this.playerOneId = playerOneId;
    this.playerTwoId = playerTwoId;
    this.turn = playerOneId;
    this.board = undefined;
}

Mancala.prototype.createGame = function(numberOfPit, numberOfSeedPerPit, playerOneId, playerTwoId){
    this.numberOfPit = numberOfPit;
    this.numberOfSeedPerPit = numberOfSeedPerPit;
    this.playerOneId = playerOneId;
    this.playerTwoId = playerTwoId;
    this.turn = playerOneId;
    this.fillAllPits();
}


Mancala.prototype.getNumberOfPit = function () {
    return this.numberOfPit;
}

Mancala.prototype.fillAllPits = function () {
    this.board = {
        [this.playerOneId]: {pits: new Array(this.numberOfPit / 2), treasure: 0},
        [this.playerTwoId]: {pits: new Array(this.numberOfPit / 2), treasure: 0},
    };
    for (let i = 0; i < this.numberOfPit / 2; i++) {
        this.board[this.playerOneId].pits[i] = this.numberOfSeedPerPit;
        this.board[this.playerTwoId].pits[i] = this.numberOfSeedPerPit;
    }
}

Mancala.prototype.fill = function (fields) {
    for (let field in fields) {
        if (this.hasOwnProperty(field) && fields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = fields[field];
            }
        }
    }
};

Mancala.prototype.incrementPit = function (player, pitId, isOpponentPit, count) {
    if(isOpponentPit){
        this.incrementOpponentPit(player, pitId, count)
    }else if(count != undefined){
        this.board[player].pits[pitId] += count
    }else{
        this.board[player].pits[pitId] += 1
    }
}

Mancala.prototype.incrementOpponentPit = function (player, pitId, count) {
    let opponentId = player === this.playerOneId ? this.playerTwoId : this.playerOneId;
    if(count != undefined){
        this.board[opponentId].pits[pitId] += count;
    }else{
        this.board[opponentId].pits[pitId] += 1
    }
}

Mancala.prototype.decrementPit = function (player, pitId, count) {
    if(count != undefined){
        this.board[player].pits[pitId] -= count
    }else{
        this.board[player].pits[pitId] -= 1
    }
}

Mancala.prototype.incrementTreasure = function (player, count) {
    if(count != undefined){
        this.board[player].treasure += count;
    }else{
        this.board[player].treasure += 1;
    }
}


Mancala.prototype.getOpponentId = function(player){
    let opponent = player === this.playerOneId ? this.playerTwoId: this.playerOneId;
    return opponent;
}

Mancala.prototype.changeTurn = function () {
    if (this.turn === this.playerOneId) {
        this.turn = this.playerTwoId;
        return;
    }
    this.turn = this.playerOneId;
}

Mancala.prototype.getPits = function (player, isOpponent) {
    if(isOpponent){
        let pits = player == this.playerOneId ? this.board[this.playerTwoId].pits: this.board[this.playerOneId].pits;
        return pits;
    }
    return this.board[player].pits
}

Mancala.prototype.getTreasure = function (player){
    return this.board[player].treasure;
}

Mancala.prototype.totalSeedCount = function (player){
    let pits = this.board[player].pits;
    return pits.reduce((sum, val)=>sum+val, 0);
}

Mancala.prototype.isGameEnded = function (player){
    let opponentId = this.getOpponentId(player);
    let isEnded = this.totalSeedCount(player) === 0 || this.totalSeedCount(opponentId) === 0;
    let winner;
    if(isEnded){
        let selfTreasureCount = this.getTreasure(player);
        let opponentTreasureCount = this.getTreasure(opponentId);
        if(selfTreasureCount != opponentTreasureCount ){
            winner =  selfTreasureCount > opponentTreasureCount ? player : opponentId;
        }

        return {isEnded, winner};
    }
}

module.exports = Mancala;