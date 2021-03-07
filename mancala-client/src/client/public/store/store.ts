import {createStore, applyMiddleware} from 'redux';
import ReduxMiddleware from "../middleware/ReduxMiddleware";



export const mancalaStore = (reducer: any)=> {
    const reduxMiddleware = new ReduxMiddleware();
    let mancalaStore = createStore(reducer, applyMiddleware(reduxMiddleware.customMiddleware()));
    reduxMiddleware.setStore(mancalaStore);
    return mancalaStore;
}

