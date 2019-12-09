import React from 'react';
import '../style/style.sass';
import Buttons from './buttons'
import Windows from './windows'
import { connect } from "react-redux";



class App extends React.Component {
    constructor(props) {
        super(props);
    }

    appHeight(){
        let App = document.getElementById('app')
        let a = screen.height - 50
        App.style.height = document.body.clientHeight - 0.5 + 'px'
    }

    render() {
        return (
            <div className="App" id='app' onLoad={this.appHeight} >
                 
                <Buttons 

                />
                <Windows 

                 />
                 
                 <div onClick={this.focusout} className='focusout'></div>
            </div>
        );
    }
}

export default connect()(App);