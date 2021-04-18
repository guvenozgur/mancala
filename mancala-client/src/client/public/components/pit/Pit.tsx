import React from "react";
import './pit.css'
import bind from "bind-decorator";

interface IPitProps{
    id: any;
    count: any;
    move: any;
}

interface IPitState{

}


export default class Pit extends React.Component<IPitProps, IPitState>{


    constructor(props: any) {
        super(props);

    }

    @bind
    move(){
        this.props.move(this.props.id);
    }

    render(){
        return (
            <div id='pit-content'>
                <button onClick={this.move}>{this.props.count}</button>
            </div>
        )
    }

}
