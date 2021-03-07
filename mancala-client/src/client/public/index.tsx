import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {mancalaRecuder} from './reducer/reducer';

import {mancalaStore} from './store/store'
import { Provider } from 'react-redux'

const store = mancalaStore(mancalaRecuder);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root')
);