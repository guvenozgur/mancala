export default interface IUIEmitter {
    loginSuccess(playerId: string): void;
    updateBoard(board: any): void;
    waitingForParticipant(isWaiting: any): void;
}
