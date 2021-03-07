import {Map} from 'immutable';


export const mancalaRecuder = (store: any  = Map(), action: any)=>{
    switch(action.type){
        case 'MOVE':
            console.log('Move');
            return store.set('board', JSON.stringify(action.data.board, null, 2));
        case 'GAME_CREATED':
            console.log('Game Created');
            return store.set('gameCreated', action.data);
        case 'SET_TURN':
            console.log('Turn');
            return store.set('turn', action.data);
        case 'SET_PLAYER_ID':
            console.log('SET_PLAYER_ID');
            let player = store.get('playerId');
            if(player){
                return store.set('playerId', player);
            }
            return store.set('playerId', action.data);
        default:
            return store 
    }
}