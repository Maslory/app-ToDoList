import React from 'react';
import '../style/style.sass';
import Buttons from './buttons'
import Windows from './windows'
import { connect } from "react-redux";



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoList: 0,
            arrayToDo: [
                {name_todo:'', subtasks:[],term:'Когда?',duration:'Сколько?',
            notes:[], type:'Какой?', haveSubtask: false,
            haveNote: false, priority: 2, day_of_number: 0},
                {name_todo:'', subtasks:[],term:'Когда?',duration:'Сколько?',
            notes:[], type:'Какой?', haveSubtask: false,
            haveNote: false, priority: 2, day_of_number: 0}
            
            ], // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
            OptionsNumber: 0,
            List_access: [],
            Sort_list: [],
            sort: 1    // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
        };
        this.changeDoA = this.changeDoA.bind(this); //
        this.changeDoD = this.changeDoD.bind(this);
        this.changeType = this.changeType.bind(this)
        this.changeNotes = this.changeNotes.bind(this)
        this.changeNameDo = this.changeNameDo.bind(this)
        this.changeSubtasks = this.changeSubtasks.bind(this)
        this.changeNote = this.changeNote.bind(this)
        this.openOptions = this.openOptions.bind(this)
        this.deleteToDo = this.deleteToDo.bind(this)
        this.setPriority = this.setPriority.bind(this)
        this.accept_list = this.accept_list.bind(this)
        this.sort_todo = this.sort_todo.bind(this)
        this.appHeight = this.appHeight.bind(this)
        this.focusout = this.focusout.bind(this)
    }

    focusout(event){
        let foc = document.getElementsByClassName('focusout');
    //     if(event.currentTarget.tagName == event.target.tagName){
    //     $('.menu_dot__properties').removeClass('active');
    //     $('.focusout').toggleClass('active');
    // }
    }

    sort_todo(arr,sort_number){
        this.setState(state => ({
            Sort_list: arr,
            sort: sort_number
        }))
    }

    accept_list(key){
        
        let list = [...this.state.List_access]
        list.push(this.state.arrayToDo[key])
        this.setState(state => ({
            List_access: list
        }));
        this.deleteToDo(key)
    }

    setPriority(priority,key, day){
        let list = [...this.state.arrayToDo]
        list[key].priority = priority
        if(list[key].priority == 4){
            list[key].day_of_number = day
        }
        this.setState(state => ({
            arrayToDo: list
        })); 
    }

    deleteToDo(key){
        let list = [...this.state.arrayToDo]
        let beforeArray = [...this.state.arrayToDo]
        list.splice(key,1)
        if(this.state.arrayToDo.length == 1){  
            this.setState(state => ({
                
                arrayToDo: [{name_todo:'', subtasks:[],term:'Когда?',duration:'Сколько?',notes:[], type:'Какой?', haveSubtask: false, haveNote: false, priority: 2, day_of_number: 0},],
                OptionsNumber: 0, 
                
            }));
        }
        else{
            this.setState(state => ({
                OptionsNumber: 0,
                arrayToDo: list,
                toDoList: state.toDoList - 1
            }));
        }
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
        list.push({name_todo:elemToDo, subtasks:[],term:'',duration:'',notes:[], type:'',haveSubtask: false, priority: 2, day_of_number: 0})
        
        this.setState(state => ({
            toDoList: state.toDoList + 1,
            arrayToDo: list,
            Sort_list: list
        }));
    }

    changeDoD(count) {
        let list = this.state.arrayToDo
      
        list.splice(count,1)
            this.setState(state => ({
                toDoList: state.toDoList - 1
            }))
        
        }


    appHeight(){
        let App = document.getElementById('app')
        console.log(screen.height)
        let a = screen.height - 50
        App.style.height = document.body.clientHeight - 0.5 + 'px'
        
        
    }
    

    componentDidUpdate() {


    }

    componentDidMount() {
        // Инициализация

    }

    render() {
        // const toDoList = this.state.toDoList;
        // if (toDoList < 0) {
        //     toDoList = 0;
        // }
        
        
        return (
            <div className="App" id='app' onLoad={this.appHeight} >
                 
                <Buttons 
                toDoList={this.state.toDoList} onClickDoAdd={this.changeDoA} arrayToDo={this.state.arrayToDo} Sort_list={this.state.Sort_list} sort_todo={this.sort_todo} 
                />
                <Windows toDoList={this.state.toDoList} changeNameDo={this.changeNameDo} changeType={this.changeType} changeSubtasks={this.changeSubtasks} sort={this.state.sort}
                changeNote={this.changeNote} deleteToDo = {this.deleteToDo} setPriority = {this.setPriority} accept_list = {this.accept_list} Sort_list={this.state.Sort_list}
                 onClickDoDelete={this.changeDoD} arrayToDo={this.state.arrayToDo} OptionsNumber={this.state.OptionsNumber} openOptions={this.openOptions} 
                 />
                 
                 <div onClick={this.focusout} className='focusout'></div>
            </div>
        );
    }
}

export default connect()(App);