import React from 'react'
import {connect} from "react-redux";
import bind from 'bind-decorator';
import {RouteComponentProps} from "react-router";
import './welcome.css';
import TextField from '@material-ui/core/TextField';

interface IWelcomeProps extends RouteComponentProps{
    createGame?: any;
    joinGame?: any;
    playerId: any;
}

interface IWelcomeState{
    gameName: String
}

class Welcome extends React.Component<IWelcomeProps, IWelcomeState>{

    constructor(props: any) {
        super(props);
        this.state = {gameName: ''};
    }

    @bind
    joinGame(){
        this.props.joinGame(this.state.gameName);
    }

    @bind
    createGame(){
        this.props.createGame(this.state.gameName);
    }

    @bind
    setGameName(event: any){
        this.setState({
            gameName: event.target.value
        });
    }


    componentDidUpdate(prevProps: Readonly<IWelcomeProps>) {
        if(prevProps.playerId !== this.props.playerId && this.props.playerId){
            this.props.history.push('/board');
        }
    }

    render(){
        return (
            <div id='welcome-container'>
                <TextField required id="standard-required" label="Required" onChange={(event)=>this.setGameName(event)}/>
                <button id='game-button' onClick={this.createGame}>Create Game</button>
                <br/>
                <TextField required id="standard-required" label="Required" onChange={(event)=>this.setGameName(event)}/>
                <button id='game-button' onClick={this.joinGame}>Join Game</button>
            </div>
        )
    }
}


const mapStateToProps = (store: any)=>{
    return {
        playerId: store.get('playerId')
    }
}

const mapDispatchToProps = (dispatch: any)=>{
    return {
        createGame: (gameName: String)=>{dispatch({type: 'createGame',  data: gameName})},
        joinGame: (gameName: String)=>{dispatch({type: 'joinGame', data: gameName})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);