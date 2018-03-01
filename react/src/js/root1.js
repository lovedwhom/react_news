import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import reducer from './reducer'
export default class Root extends React.Component{

    inc(){
        return{type:'ADD'}
    }
    dec(){
        return{type:'SUB'}
    }
    componentDidMount(){
        var store=createStore(reducer);
        console.log(store.getState());

        store.dispatch(this.inc());
        console.log(store.getState());

        // store.dispatch(this.inc());
        // console.log(store.getState());

        store.dispatch(this.dec());
        console.log(store.getState());
    }

    render(){
        return(
            <div>
                redux
            </div>
        )
    }
}

ReactDOM.render(<Root/>,document.getElementById('mainContainer'))