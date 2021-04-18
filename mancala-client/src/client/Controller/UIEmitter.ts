import bind from 'bind-decorator';
import IUIEmitter from "./IUIEmitter";

export default class UIEmitter implements IUIEmitter{

    private readonly store: any;

    constructor(store: any) {
        this.store = store;
    }

    @bind
    loginSuccess(playerId: string): void {
        this.store.dispatch({type: 'SET_PLAYER_ID', data: playerId});
    }

    @bind
    updateBoard(game: any): void {
        this.store.dispatch({type: `UPDATE_BOARD`, data: game});
    }

    @bind
    waitingForParticipant(isWaiting: any): void {
        this.store.dispatch({type: `WAITING_FOR_PARTICIPANT`, data: isWaiting});
    }

}