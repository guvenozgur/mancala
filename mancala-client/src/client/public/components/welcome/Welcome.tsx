import React from 'react'
import {connect} from "react-redux";
import bind from 'bind-decorator';
import {RouteComponentProps} from "react-router";
import './welcome.css';
import TextField from '@material-ui/core/TextField';


interface IWelcomeProps extends RouteComponentProps {
    createGame: any;
    joinGame: any;
    login: any;
    playerId: any;
    gameName: any;
    game: any;
    isWaitingForParticipant: any
}

interface IWelcomeState {
    gameName: String,
    playerId: String
}

class Welcome extends React.Component<IWelcomeProps, IWelcomeState> {

    constructor(props: any) {
        super(props);
        this.state = {gameName: '', playerId: ''};
    }

    @bind
    joinGame() {
        this.props.joinGame(this.state.gameName);
    }

    @bind
    createGame() {
        this.props.createGame(this.state.gameName);
    }

    @bind
    setGameName(event: any) {
        this.setState({
            gameName: event.target.value
        });
    }

    @bind
    setPlayerName(event: any) {
        this.setState({
            playerId: event.target.value
        });
    }

    @bind
    login() {
        if (this.state.playerId) {
            return this.props.login(this.state.playerId);
        }
        console.log(`Player name can not be empty..`);

    }

    componentDidUpdate(prevProps: Readonly<IWelcomeProps>) {
        if (prevProps.game !== this.props.game && this.props.game) {
            this.props.history.push('/board');
        }
    }

    render() {
        return (
            <div id='welcome-container'>
                {!this.props.playerId &&
                <div>
                    <TextField required id="standard-required" label="Required" onChange={(event)=>this.setPlayerName(event)}/>
                    <button id='game-button' onClick={this.login}>Login</button>
                </div>
                }
                {this.props.playerId && !this.props.isWaitingForParticipant &&
                <div>
                    <TextField required id="standard-required" label="Required"
                               onChange={(event) => this.setGameName(event)}/>
                    <button id='game-button' onClick={this.createGame}>Create Game</button>
                    <br/>
                    <TextField required id="standard-required" label="Required"
                               onChange={(event) => this.setGameName(event)}/>
                    <button id='game-button' onClick={this.joinGame}>Join Game</button>
                </div>
                }
                {this.props.playerId && this.props.isWaitingForParticipant &&
                    <div>Waiting for participant...</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (store: any) => {
    return {
        playerId: store.get('playerId'),
        gameName: store.get('gameName'),
        game: store.get('game'),
        isWaitingForParticipant: store.get('isWaiting'),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        createGame: (gameName: string) => {
            dispatch({type: 'createGame', data: gameName})
        },
        joinGame: (gameName: string) => {
            dispatch({type: 'joinGame', data: gameName})
        },
        login: (playerId: string) => {
            dispatch({type: 'login', data: playerId})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);