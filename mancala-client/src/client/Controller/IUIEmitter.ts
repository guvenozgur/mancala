export default interface IUIEmitter {

    createGameResponse(msg: any): void;
    moveResp(msg: any): void;
    setTurn(msg: any): void;
}
