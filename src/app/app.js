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
            arrayToDo: [{name_todo:'', subtasks:[],term:'Когда?',duration:'Сколько?',notes:[], type:'Какой?', haveSubtask: false, haveNote: false},],
            OptionsNumber: 0
        };
        this.changeDoA = this.changeDoA.bind(this);
        this.changeDoD = this.changeDoD.bind(this);
        this.changeType = this.changeType.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
        this.changeNameDo = this.changeNameDo.bind(this)
        this.changeSubtasks = this.changeSubtasks.bind(this)
        this.changeNote = this.changeNote.bind(this)
        this.openOptions = this.openOptions.bind(this)
    }

    changeNote(OptionsNumber, text_note, time){
        let list = [...this.state.arrayToDo]
        list[OptionsNumber].notes.push({text: text_note, time_note: time})
        list[OptionsNumber].haveNote = true 
        // alert(list[count].name_todo)
        this.setState(state => ({
            arrayToDo: list
        }));
    }

    openOptions(count){
        this.setState(state => ({
            OptionsNumber: count
        }));
    }
 changeType(count,type_select,selected_row){
    let list = [...this.state.arrayToDo]
    if(selected_row == 'type'){
        list[count].type = type_select
        this.setState(state => ({
            arrayToDo: list
        
        }));
    }
    if(selected_row == 'term'){
        list[count].term = type_select
        this.setState(state => ({
            arrayToDo: list
        
        }));
    }
    if(selected_row == 'duration'){
        list[count].duration = type_select
        this.setState(state => ({
            arrayToDo: list
        
        }));
    }
    
    
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
changeSubtasks(OptionsNumber, text_subtask, time){
    let list = [...this.state.arrayToDo]
    list[OptionsNumber].subtasks.push({text: text_subtask, time_subtask: time})
    list[OptionsNumber].haveSubtask = true 
    // alert(list[count].name_todo)
    this.setState(state => ({
        arrayToDo: list
    
    }));
}




    changeDoA(elemToDo='') {
        console.log(this.state.arrayToDo)
        let list = [...this.state.arrayToDo]
        list.push({name_todo:elemToDo, subtasks:[],term:'',duration:'',notes:[], type:'',haveSubtask: false})
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
                <Windows toDoList={this.state.toDoList} changeNameDo={this.changeNameDo} changeType={this.changeType} changeSubtasks={this.changeSubtasks}
                changeNote={this.changeNote}
                 onClickDoDelete={this.changeDoD} arrayToDo={this.state.arrayToDo} OptionsNumber={this.state.OptionsNumber} openOptions={this.openOptions} />
             
            </div>
        );
    }
}

export default App;