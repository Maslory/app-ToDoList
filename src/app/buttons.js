import React from 'react';
import '../style/style.sass';
import { throws } from 'assert';
import add_list from '../img/add_list.svg'
import notepad from '../img/notepad.svg'
import sort_todo from '../img/sort_todo.svg'
import Sort_by_property from './time/Sort_by_property'

let toDo = 0;


class Buttons extends React.Component  {
  constructor(props){
    super(props);
    this.addDo = this.addDo.bind(this);
    this.changeInput = this.changeInput.bind(this)
    this.sort_arrayToDo = this.sort_arrayToDo.bind(this)
    this.select_type_sort = this.select_type_sort.bind(this)
    this.props.arrayToDo
    this.props.Sort_list
  }

  select_type_sort(event){
    let list = [...this.props.arrayToDo]
    if(event.target.textContent == 'Сортировать по приоритету'){
      let sort_array = list.sort((a,b) => a.priority - b.priority)
      this.props.sort_todo(sort_array, 2)
      
    }
    else if(event.target.textContent == 'Сортировать по дате добавления'){
      this.props.sort_todo(list, 1)
    }
    let hide_menu = event.target.parentNode.parentNode
    hide_menu.style.display = 'none'
  }

  sort_arrayToDo(event){
    let item = event.target
    let show_menu = item.parentNode.childNodes[1]
  
    show_menu.style.display = (show_menu.style.display == 'block') ? show_menu.style.display='none' : show_menu.style.display='block'
    
    // if(item.textContent == 'Сортировать по приоритету' ){
      
    // }
    // else if(item.textContent == 'Сортировать по дате добавления' ){
      
    // }
    // item.parentNode.parentNode.style.display = 'none'
    // event.stopPropagation()
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
        <img onClick={this.addDo}  alt='создать новое дело' title='создать новое дело' src={add_list}></img>
        <span id='sort_span'>
          <img onClick={this.sort_arrayToDo}  alt='сортировка дел' title='сортировка дел' src={sort_todo}></img>
          <div id='priority_menu'>
                <ul onClick={this.select_type_sort}>
                  <li>Сортировать по приоритету</li>
                  <li>Сортировать по дате добавления</li>
                </ul>
              </div>
        </span>
        <span>Количество дел: {countToDO + 1} </span>
        <input placeholder='Какое дело?' id='input_ToDo'  autoComplete='off'  required ></input>
        
        
        Уведомления
      </header>
  );
  }
  
}

export default Buttons;