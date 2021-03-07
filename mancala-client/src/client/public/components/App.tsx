import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'


import './app.css'
import Welcome from "./welcome/Welcome";
import Board from "./board/Board";


export default class App extends React.PureComponent {


    render() {

        return (
            <div>
                <BrowserRouter>
                    <div id='app-content'>
                        <Switch>
                            <Route exact path='/board' component={Board}/>
                            <Route exact path='/' component={Welcome}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}