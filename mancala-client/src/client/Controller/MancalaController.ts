import IUIEmitter from "./IUIEmitter";
import IMancalaController from "./IMancalaController";
import * as io from 'socket.io-client';
import bind from 'bind-decorator';
import {serverSocketEvents, clientSocketEvents, socketConfs} from '../../config/Mappings';

export default class MancalaController implements IMancalaController{

    private uiEmitter: IUIEmitter;
    private gameName: String;
    private readonly socket: any;

    constructor() {
        this.socket = io.connect(socketConfs.socketUrl);
        this.socket.onMessage = this.onMessage;
        this.socket.on(clientSocketEvents.CREATE_RESP, this.gameCreation);
        this.socket.on(clientSocketEvents.GET_ALL_GAMES_RESP, this.allGames);
        this.socket.on(clientSocketEvents.MOVE_RESP, this.postMove);
        this.socket.on(clientSocketEvents.DELETE_GAME_RESP, this.gameDeleted);
        this.socket.on(clientSocketEvents.JOIN_RESP, this.joinSuccess);
    }

    @bind
    createGame(gameName: string): void {
        this.gameName = gameName;
        this.socket.emit(serverSocketEvents.CREATE, {gameName});
    }

    @bind
    joinGame(gameName: string): void {
        this.gameName = gameName;
        this.socket.emit(serverSocketEvents.JOIN, {gameName})
    }

    @bind
    move(pitId: number): void {
        this.socket.emit(serverSocketEvents.MOVE, {pitId})
        console.log(`pit: ${pitId} && game: ${this.gameName}`);
    }

    @bind
    moveResp(msg: any){
        this.uiEmitter.moveResp(msg);
    }

    @bind
    initiateConnection(uiEmitter: any): void {
        this.uiEmitter = uiEmitter;
    }

    @bind
    onMessage(msg: any){
        console.log(JSON.stringify(msg));
    }

    @bind
    emitMessage(type: String, msg: any){
        this.socket.emit(type, msg);
    }

    @bind
    gameCreation(msg: any){
        console.log(`Game created: ${JSON.stringify(msg)}`);
        this.uiEmitter.createGameResponse(msg.playerOneId);
    }

    @bind
    allGames(msg: any){
        console.log(`All games: ${JSON.stringify(msg)}`);
    }


    @bind
    postMove(msg: any){
        console.log(`Move: ${JSON.stringify(msg)}`);
        this.uiEmitter.moveResp(JSON.parse(msg.mancala));
        this.uiEmitter.setTurn(JSON.parse(msg.mancala).turn);
    }


    @bind
    gameDeleted(msg: any){
        console.log(`Game Deleted: ${JSON.stringify(msg)}`);
    }

    @bind
    joinSuccess(msg: any){
        console.log(`Join Success: ${JSON.stringify(msg)}`);
        this.uiEmitter.createGameResponse(msg.game.playerTwoId);

    }


}