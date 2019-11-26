import React from 'react';
import ReactDOM from 'react-dom';
import '../style/style.sass';
import App from './app';
import ToDoShow from './todo_show'
import { storeFactory } from './store/store'
import {Provider} from 'react-redux'

const store = storeFactory() 

// console.log(store.getState())
// ReactDOM.render(<App/>, document.getElementById('root'));
// ReactDOM.render(<App/>, document.getElementById('root'));   
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('test'))
// ReactDOM.render(
//     <Provider store={store}>
//         <ToDoShow/>
//     </Provider>, 
//     document.getElementById('test'))