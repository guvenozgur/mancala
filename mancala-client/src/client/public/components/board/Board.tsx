import React from 'react';
import {connect} from "react-redux";
import bind from 'bind-decorator';
import './board.css';
import Pit from "../pit/Pit";


interface IBoardProps {
    game: any;
    move: any;
    playerId: any;
    turn: any;
}

interface IBoardState {
    pit: number;
    opponentPits: any;
    opponentTreasure: any;
    selfPits: any;
    selfTreasure: any;
    board:any;
    turn: any;
}

class Board extends React.Component<IBoardProps, IBoardState> {

    constructor(props: IBoardProps) {
        super(props);
        this.state = {
            pit: 1,
            opponentPits: undefined,
            opponentTreasure: undefined,
            selfPits: undefined,
            selfTreasure: undefined,
            board: undefined,
            turn: undefined
        };
    }

    @bind
    handleChange(event: any) {
        this.setState({pit: event.target.value})
    }

    @bind
    move() {
        this.props.move(this.state.pit);
    }

    @bind
    movePit(id: number) {
        this.props.move(id);
    }

    @bind
    notAllowedMove(id: number){
        console.log(`not allowed move: ${id}`);
    }

    preparePits(){
        if(this.props.game?.board){
            this.setState({turn: this.props.game.turn});
            let board = this.props.game.board;
            let ownPits = board[this.props.playerId].pits.map((count: any, index: any)=>{
                return (
                    <Pit count={count} id={index} move={this.movePit}></Pit>
                )
            });
            let ownTreasure = board[this.props.playerId].treasure;
            let opponentId = this.getOpponentId();
            let opponentPits = board[opponentId].pits.map((count: any, index: any)=>{
                return (
                    <Pit count={count} id={index} move={this.notAllowedMove}></Pit>
                )
            });
            let opponentTreasure = board[opponentId].treasure;
            return {ownPits,ownTreasure, opponentPits, opponentTreasure};
        }

       return
    }

    getOpponentId(): any{
        return Object.keys(this.props.game.board).find(id => id!=this.props.playerId)
    }


    componentDidUpdate(prevProps: Readonly<IBoardProps>) {
        if (prevProps.game !== this.props.game && this.props.game) {
            this.setState({board: this.preparePits()});
        }
    }

    componentDidMount() {
        this.setState({board: this.preparePits()});
    }

    render() {
        return (
            <div>
                <h4>Player: {this.props.playerId}</h4>
                <br/>
                <div id='game-text-element'>
                Turn: {this.state.turn}
                </div>
                <div id='game-board'>
                    {this.state.board &&
                    <div>
                        <div id='game-board-side'>
                            {this.state.board.ownPits}
                            {this.state.board.ownTreasure}
                        </div>
                        <div id='game-board-side'>
                            {this.state.board.opponentPits}
                            {this.state.board.opponentTreasure}
                        </div>
                    </div>
                    }
                </div>

            </div>
        )
    }
}

const mapStateToProps = (store: any) => {
    return {
        game: store.get('game'),
        playerId: store.get('playerId'),
        turn: store.get('turn')
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        move: (pitId: String) => {
            dispatch({type: 'move', data: pitId})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);