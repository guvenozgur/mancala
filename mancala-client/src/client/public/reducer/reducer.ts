import {Map} from 'immutable';


export const mancalaRecuder = (store: any = Map(), action: any) => {
    switch (action.type) {
        case 'UPDATE_BOARD':
            console.log('UPDATE_BOARD');
            return store.set('game', action.data);
        case 'SET_PLAYER_ID':
            console.log('Set player id');
            return store.set('playerId', action.data);
        case 'SET_GAME_NAME':
            console.log('Set game name id');
            return store.set('gameName', action.data);
        case 'WAITING_FOR_PARTICIPANT':
            return store.set('isWaiting', action.data);
        default:
            return store
    }
}