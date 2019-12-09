import React from 'react';
import ReactDOM from 'react-dom';
import '../style/style.sass';
import App from './app';
import ToDoShow from './todo_show'
import { storeFactory } from './store/store'
import {Provider} from 'react-redux'

const store = storeFactory() 


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('test'))
