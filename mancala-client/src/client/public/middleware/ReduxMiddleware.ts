import MancalaController from "../../Controller/MancalaController";
import UIEmitter from "../../Controller/UIEmitter";
import IUIEmitter from "../../Controller/IUIEmitter";
import IMancalaController from "../../Controller/IMancalaController";
import bind from "bind-decorator";


export default class ReduxMiddleware{
    private readonly mancalaController: IMancalaController;
    private uiEmitter: IUIEmitter;

    constructor() {
        this.mancalaController = new MancalaController();
    }


    @bind
    setStore(store: any){
        this.uiEmitter = new UIEmitter(store);
        this.mancalaController.initiateConnection(this.uiEmitter);
    }


    @bind
    customMiddleware(){
        return (store: any)=> (next: any) => (action: any) => {

            // @ts-ignore
            if(this.mancalaController && typeof this.mancalaController[action.type] === 'function'){
                // @ts-ignore
                this.mancalaController[action.type](action.data);
                return;
            }
            console.log(`Store state: ${store.getState()}`);
            console.log('Middleware triggered..')
            console.log('Type of action: ' + action.type)
            return next(action)
        }
    }

}





