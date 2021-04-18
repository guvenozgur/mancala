import IUIEmitter from "./IUIEmitter";
import IMancalaController from "./IMancalaController";
import * as io from 'socket.io-client';
import {serverSocketEvents, clientSocketEvents, socketConfs, paths} from '../../config/Mappings';
import bind from "bind-decorator";
import {httpGet} from "../util/RestUtil";

export default class MancalaController implements IMancalaController{

    private uiEmitter: IUIEmitter;
    private gameName: string;
    private socket: any;
    private playerId: string

    @bind
    async login(playerId: string){
        try{
            await httpGet(`${socketConfs.socketUrl}${paths.LOGIN}`, {username: playerId});
            this.playerId = playerId;
            this.initSocket();
        }catch (e){
            console.log(`Login error`)
        }
    }

    @bind
    initSocket(){
        this.socket = io.connect(socketConfs.socketUrl);
        this.socket.on('connect', ()=>{
            this.socket.on(clientSocketEvents.MOVE_RESP, this.postMove);
            this.socket.on(clientSocketEvents.JOIN_RESP, this.joinSuccess);
            this.uiEmitter.loginSuccess(this.playerId);
        });
    }

    @bind
    createGame(gameName: string): void {
        this.gameName = gameName;
        this.socket.emit(serverSocketEvents.CREATE, {gameName}, ()=>{
            this.gameCreated();
        });
    }

    @bind
    joinGame(gameName: string): void {
        this.gameName = gameName;
        this.socket.emit(serverSocketEvents.JOIN, {gameName}, (response: any)=>{
            this.joinSuccess(response);
        })
    }

    @bind
    move(pitId: number): void {
        this.socket.emit(serverSocketEvents.MOVE, {pitId}, (response: any)=>{
            this.moveResp(response);
        })
        console.log(`pit: ${pitId} && game: ${this.gameName}`);
    }

    @bind
    moveResp(msg: any){
        this.uiEmitter.updateBoard(msg.game);
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
    gameCreated(){
        console.log(`Game created...`);
        this.uiEmitter.waitingForParticipant(true);
    }


    @bind
    postMove(msg: any){
        console.log(`Move: ${JSON.stringify(msg)}`);
        this.uiEmitter.updateBoard(msg.game);
    }


    @bind
    gameDeleted(msg: any){
        console.log(`Game Deleted: ${JSON.stringify(msg)}`);
    }

    @bind
    joinSuccess(msg: any){
        console.log(`Join Success: ${JSON.stringify(msg)}`);
        this.uiEmitter.updateBoard(msg.game);
        this.uiEmitter.waitingForParticipant(false);
    }
}