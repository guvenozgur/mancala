import React from 'react';
import TextField from "@material-ui/core/TextField";


interface IPitProps{
    id: any,
    count: any
    select?: any
}

interface IPitState {
    things: any
}

export default class Pit extends React.Component<IPitProps, IPitState>{

    constructor(props: IPitProps) {
        super(props);
    }
    render(){
        return (
            <div id='pit-container'>
                Hello
                <TextField required id="standard-required" label="Required" disabled={true} value={this.props.id}/>
                <button id='game-button' onClick={this.props.select(this.props.id)}>Join Game</button>
            </div>
        )
    }
}


