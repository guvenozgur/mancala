import bind from 'bind-decorator';
import IUIEmitter from "./IUIEmitter";

export default class UIEmitter implements IUIEmitter{

    private readonly store: any;

    constructor(store: any) {
        this.store = store;
    }

    @bind
    createGameResponse(msg: any): void{
        this.store.dispatch({type: `SET_PLAYER_ID`, data: msg});
    }

    @bind
    moveResp(msg: any): void{
        this.store.dispatch({type: `MOVE`, data: msg});
    }

    @bind
    setTurn(msg: any): void {
        this.store.dispatch({type: `SET_TURN`, data: msg});
    }

}