const redisHelper = require('../cache/Helper')();
const config = require('../../config/Config');
let Mancala = require('../model/Mancala');
let mancala;

module.exports.move = async (gameId, player, selectedPitId)=>{
    // Get Mancala from redis
    mancala = new Mancala();
    mancala.fill(await redisHelper.getBoard(gameId));
    let seedCount = mancala.getPits(player)[selectedPitId];
    let movable = isMovable(mancala, player, seedCount);
    if(movable){
        mancala.decrementPit(player, selectedPitId, seedCount);
        let {pitId, isOpponentPit} = incrementPit(player, seedCount, selectedPitId+1);
        applyRules(isOpponentPit, pitId, mancala, player);
        let isWinner = mancala.totalSeedCount(player) === 0 ? true : false;
        await redisHelper.upsertBoard(mancala, gameId)
        return{isWinner, mancala: JSON.stringify(mancala)}
    }
    throw new Error('Move is not allowed!');
}

module.exports.createGame = async (gameId, playerOneId, playerTwoId)=>{
    mancala = new Mancala();
    mancala.createGame(config.NUMBER_OF_PIT, config.NUMBER_OF_SEED_PER_PIT, playerOneId, playerTwoId);
    await redisHelper.upsertBoard(mancala, gameId);
    return JSON.stringify(mancala);
}

module.exports.removeGame = async (gameId)=>{
    await redisHelper.clearGame(gameId);
}

module.exports.getGame = async (gameId)=>{
    await redisHelper.getBoard(gameId);
}


function isMovable(mancala, player, seedCount){
    if(mancala.turn ===player && seedCount>0){
        return true;
    }
    return false;
}

function incrementPit(player, count, pitId, isOpponentPit){
    if(count===0){
        if(pitId != 0){
            pitId -=1;
        }
        return {pitId, isOpponentPit};
    }
    if(pitId>=(mancala.getNumberOfPit()/2)){
        if(!isOpponentPit){
            mancala.incrementTreasure(player);
            count--;
        }
        return incrementPit(player, count, 0, !isOpponentPit);
    }
    mancala.incrementPit(player, pitId, isOpponentPit);
    return incrementPit(player, --count, ++pitId, isOpponentPit);
}

function applyRules(isOpponent, currentPid, mancala, player){
    if(isOpponent){
        // Rule 1
        // Player seeds end on its treasure
        if(currentPid === 0){
            return ;
        };
        /*
        let seedCount = mancala.getPits(mancala.getOpponentId(player))[currentPid];
        // Rule 2
        // Player makes one of opponent's pit even
        if(seedCount%2 ===0){
            mancala.decrementPit(mancala.getOpponentId(player), currentPid, seedCount);
            mancala.incrementTreasure(player, seedCount);
        }
         */
        mancala.changeTurn();
        return;
    }
    // Rule 3
    // if player's pit is empty
    if(mancala.getPits(player)[currentPid] === 1){
        let crossPitId =  (mancala.getNumberOfPit()/2)-currentPid-1;
        let crossPitCount = mancala.getPits(player, true)[crossPitId];
        let currentPitCount = mancala.getPits(player)[currentPid];
        mancala.decrementPit(player, currentPid, currentPitCount);
        mancala.decrementPit(mancala.getOpponentId(player), crossPitId, crossPitCount);
        mancala.incrementTreasure(player, crossPitCount+currentPitCount);
    }
    mancala.changeTurn();
}


