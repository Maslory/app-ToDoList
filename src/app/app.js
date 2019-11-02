import React from 'react';
import '../style/style.sass';
import Buttons from './buttons'
import Windows from './windows'
import logo_krest from '../img/krest.png'
// import logClockTime from './time/timer'
// import startTicking from './time/timer'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoList: 0,
            arrayToDo: [],
            OptionsNumber: 0
        };
        this.changeDoA = this.changeDoA.bind(this);
        this.changeDoD = this.changeDoD.bind(this);
        this.changeType = this.changeType.bind(this)
        this.changeTerm = this.changeTerm.bind(this)
        this.changeDuration = this.changeDuration.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
        this.changeNameDo = this.changeNameDo.bind(this)
        this.changeSubtasks = this.changeSubtasks.bind(this)
        this.openOptions = this.openOptions.bind(this)
    }
    openOptions(count){
        this.setState(state => ({
            OptionsNumber: count
        }));
    }
 changeType(){
    this.setState(state => ({
        toDoList: state.toDoList + 1,
        arrayToDo: list
    
    }));
 }
 changeTerm(){

 }
 changeDuration(){
     
}
changeNotes(){
     
}
changeNameDo(count, text){
    let list = [...this.state.arrayToDo]
    list[count].name_todo = text

    // alert(list[count].name_todo)
    this.setState(state => ({
        arrayToDo: list
    
    }));
}
changeSubtasks(){
     
}




    changeDoA(elemToDo='') {
        console.log(this.state.arrayToDo)
        let list = [...this.state.arrayToDo]
        list.push({name_todo:elemToDo, subtasks:[],term:'',duration:'',notes:[], type:''})
        this.setState(state => ({
            toDoList: state.toDoList + 1,
            arrayToDo: list
        
        }));
    }

    changeDoD(count) {
        let list = this.state.arrayToDo
      
        list.splice(count,1)
            this.setState(state => ({
                toDoList: state.toDoList - 1
            }))
        
        }


    

    componentDidUpdate() {


    }

    render() {
        // const toDoList = this.state.toDoList;
        // if (toDoList < 0) {
        //     toDoList = 0;
        // }
        
        return (
            <div className="App"  >
                <Buttons toDoList={this.state.toDoList} onClickDoAdd={this.changeDoA} arrayToDo={this.state.arrayToDo} />
                <Windows toDoList={this.state.toDoList} changeNameDo={this.changeNameDo}
                 onClickDoDelete={this.changeDoD} arrayToDo={this.state.arrayToDo} OptionsNumber={this.state.OptionsNumber} openOptions={this.openOptions} />
             
            </div>
        );
    }
}

export default App;