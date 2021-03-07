import IUIEmitter from "./IUIEmitter";

export default interface IMancalaController{

    move(pit: number): void;
    createGame(gameName: string): void;
    joinGame(gameName: string): void;
    initiateConnection(uiEmitter: IUIEmitter):void;

}