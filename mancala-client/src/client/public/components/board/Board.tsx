import React from 'react';
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import bind from 'bind-decorator';
import './board.css';

const pits = [
    {
        value: '0',
        label: 'Pit 0',
    },
    {
        value: '1',
        label: 'Pit 1',
    },
    {
        value: '2',
        label: 'Pit 2',
    },
    {
        value: '3',
        label: 'Pit 3',
    },
    {
        value: '4',
        label: 'Pit 4',
    },
    {
        value: '5',
        label: 'Pit 5',
    }
];

interface IBoardProps {
    boardData: any;
    move: any;
    playerId: any;
    turn: any;
}

interface IBoardState {
    pit: number;
    prevBoardData: any;
    opponentPits: any;
    opponentTreasure: any;
    selfPits: any;
    selfTreasure: any;
}

class Board extends React.Component<IBoardProps, IBoardState> {

    constructor(props: IBoardProps) {
        super(props);
        this.state = {
            pit: 1,
            prevBoardData: '',
            opponentPits: undefined,
            opponentTreasure: undefined,
            selfPits: undefined,
            selfTreasure: undefined
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


    componentDidUpdate(prevProps: Readonly<IBoardProps>) {
        if (prevProps.boardData !== this.props.boardData && this.props.boardData) {
            this.setState({prevBoardData: prevProps.boardData});
        }
    }

    render() {
        return (
            <div>
                <h4>{this.props.playerId}</h4>
                <br/>
                <TextField
                    id="standard-select-currency-native"
                    select
                    label="Native select"
                    value={this.state.pit}
                    onChange={this.handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Please select your currency">
                    {pits.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
                <button id='game-button' onClick={this.move}>Move</button>


                <div id='game-text-element'>
                    Selected Pit: {this.state.pit}
                </div>
                <div id='game-text-element'>
                Turn: {this.props.turn}
                </div>
                <div id='game-board'>
                    <div id='game-text-element'>
                    Current board:
                    </div>
                    <pre>{this.props.boardData}</pre>
                    <div id='game-text-element'>
                    Previous board:
                    </div>
                    <pre>{this.state.prevBoardData}</pre>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (store: any) => {
    return {
        boardData: store.get('board'),
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