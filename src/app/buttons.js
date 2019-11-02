import React from 'react';
import '../style/style.sass';
import { throws } from 'assert';


let toDo = 0;


class Buttons extends React.Component  {
  constructor(props){
    super(props);
    this.addDo = this.addDo.bind(this);
    this.changeInput = this.changeInput.bind(this)
    
    this.props.arrayToDo
  }

  componentDidUpdate(){
    const toDoList = this.props.toDoList;
    // console.log('${toDoList}')
  
  }

  addDo() {
    if(this.props.toDoList == 8) return;
    this.props.onClickDoAdd(this.changeInput());
    
    
  }

componentDidUpdate(){
  console.log(this.props.arrayToDo)
}

changeInput(){
  let input_ToDo = document.getElementById('input_ToDo')
  return input_ToDo.value
}

  render(){
    const countToDO = this.props.toDoList 
   
    return (
      <header className="buttons">
        <a id="add" onClick={this.addDo} id='add'>Добавить дело +</a>
        <span>Количество дел: {countToDO} </span>
        <input placeholder='Какой дело?' id='input_ToDo'  autoComplete='off'  required ></input>
       
      </header>
  );
  }
  
}

export default Buttons;