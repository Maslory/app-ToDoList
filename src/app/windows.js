import React from 'react';
import '../style/style.sass';
import logo_krest from '../img/krest.png'
import arrow_up from '../img/arrow_up.svg'
import arrow_down from '../img/arrow_down.svg'
import $ from 'jquery';
import startTicking from './time/timer';
import logClockTime from './'
import setTime from './time/timer';
import access_list from '../img/access_list.svg'
import delete_list from '../img/delete_list.svg'
import list_noname from '../img/list_noname.svg'
import list_priority from '../img/list_priority.svg'
import list_defer from '../img/list_defer.svg'
import ToDoList from './ToDoList'
import CaseSettings from './CaseSettings';
import {connect} from "react-redux"
import Options from './Options';
import plus from '../img/plus_thin.svg'
import shevron_right from '../img/arrow_right.svg'
import accept_mark from '../img/priority/accept_mark.svg'
import time_mark from '../img/priority/time_mark.svg'
import date_mark from '../img/priority/date_mark.svg'
import priority_mark from '../img/priority/priority_mark.svg'
import {sort_case, complete_case, selected_case, change_overdue} from './actions/actions';
import timeout from '../img/priority/timeout.svg'

let dragObject = {};
let toDoListDo = 0;
let FixedList = 0;
let Fixed = [];

let inputText = ''

let list 

class Windows extends React.Component {
  constructor(props) {
    super(props);
    this.fixState = this.fixState.bind(this);
    this.closeDO = this.closeDO.bind(this)
    this.showDo = this.showDo.bind(this)
    this.showOptions = this.showOptions.bind(this)
    this.changeName = this.changeName.bind(this)
    this.select_type = this.select_type.bind(this)
    this.inputSubtask = this.inputSubtask.bind(this)
    this.add_subtask = this.add_subtask.bind(this)
    this.add_note = this.add_note.bind(this)
    this.inputNote = this.inputNote.bind(this)
    this.changeText = this.changeText.bind(this)
    this.textarea_note = this.textarea_note.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.select_priority = this.select_priority.bind(this)
    this.access_list = this.access_list.bind(this)
    this.task_click = this.task_click.bind(this)
    this.sort = this.sort.bind(this)
    this.showFilters = this.showFilters.bind(this)
    this.sortArrayToDo = this.sortArrayToDo.bind(this)
    this.props.arrayToDo
    this.props.toDoList

   
    this.props.OptionsNumber
    this.props.Sort_list
    this.substask_text = ''
    this.note_text = ''
    
    // this.createToDo = this.createToDo.bind(this)
  }


  sortArrayToDo(event){
      let list = [...this.props.colors]
      let date_now = new Date()
      let date_week = new Date().getDate() + 7
      let date_month = new Date().getMonth()
      if(event.currentTarget.textContent == 'По приоритету'){
        let sort_array = list.sort((a,b) => a.priority - b.priority)
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array, 2)
        
      }
      else if(event.currentTarget.textContent == 'Дата добавления'){
        this.props.sort(list, 1)
        
        this.props.selectedCase(-1)
      }
      else if(event.currentTarget.textContent == 'Выполненные'){
        if(this.props.list_access.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.selectedCase(-1)
        console.log(this.props.list_access)
        this.props.sort(this.props.list_access, 3)
      }
      else if(event.currentTarget.textContent == 'Высокий приоритет'){
        let sort_array = list.filter(elem => elem.priority == 1)
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array , 4)
      }
      else if(event.currentTarget.textContent == 'Средний приоритет'){
        let sort_array = list.filter(elem => elem.priority == 2)
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array , 5)
      }
      else if(event.currentTarget.textContent == 'Низкий приоритет'){
        let sort_array = list.filter(elem => elem.priority == 3)
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array , 6)
      }
      else if(event.currentTarget.textContent == 'Отложенные'){
        let sort_array = list.filter(elem => elem.priority == 4)
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array , 7)
      }
      else if(event.currentTarget.textContent == 'Входящие'){
        this.props.sort(list, 1)
        
        this.props.selectedCase(-1)
      }
      else if(event.currentTarget.textContent == 'Сегодня'){
        
        let sort_array = list.filter(elem => elem.date == date_now)
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array , 8)
      }
      else if(event.currentTarget.textContent == 'Следующие 7 дней'){
        // alert(date_week)
        // alert(date_month)
        // alert(date_now.getDate())
        let sort_array = list.filter(elem =>  (elem.date.getMonth() == date_month) && ( (date_week > elem.date.getDate()) && (elem.date.getDate() > date_now.getDate())) )
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array , 9)
      }
     
      // else if(event.currentTarget.textContent == 'Просроченные'){
      //   let newTimeArray = [...this.props.colors]
      // let date = new Date();
      // let arrayOverdue = [...this.props.overdueItems]
      // console.log("Изначальный массив: ", newTimeArray)
      // console.log("Сегодняшний день: ", date_now.getDate(), ' год: ', date_now.getYear()
      // , '/n месяц: ', date_now.getMonth())
      // console.log("Сегодняшний день: ", newTimeArray[0].date.getDate(), ' год: ', newTimeArray[0].date.getYear()
      // , '/n месяц: ',  newTimeArray[0].date.getMonth())
      // let filterArray = newTimeArray.filter((elem) => elem.date.getYear() <= date_now.getYear() && elem.date.getMonth() <= date_now.getMonth() )
      // let filterArray = newTimeArray.map((elem) =>{
      //   if(elem.date.getYear() <= date_now.getYear() && elem.date.getMonth() < date_now.getMonth()){

      //   }
      //   if(elem.date.getYear() <= date_now.getYear() && elem.date.getMonth() <= date_now.getMonth())
      // })
      // && 
      //   (elem.date.getYear() <= date_now.getYear()) && (elem.date.getMonth <= date_now.getMonth()))
     
      // newTimeArray.filter((elem) => (elem.date.getDate() < date_now.getDate()) && 
      // (elem.date.getYear() <= date_now.getYear()) && (elem.date.getMonth <= date_now.getMonth()))
      //   if(newTimeArray.length == 0) {
      //     this.props.selectedCase(-1)
      //   }
      //   else{
      //     this.props.selectedCase(0)
      //   }
      //   console.log(newTimeArray)
      //   console.log(newTimeArray.filter((elem) => (elem.date.getDate() < date_now.getDate()) && 
      //   (elem.date.getYear() <= date_now.getYear()) && (elem.date.getMonth <= date_now.getMonth())))
      //   arrayOverdue = arrayOverdue.concat(array_filter)
      //   console.log(arrayOverdue)
      //   this.props.sort(newTimeArray , 8)
      // }

  }

  task_click(event) {
    let item = event.target
    let this_item = item.parentNode
    let key = item.getAttribute('key7')
    let day = item.parentNode.childNodes[1].value
    let priority
    if (day > 0) {
      priority = 4
    }
    else {
      priority = 2
    }
    this.props.setPriority(priority, key, day)
    item.parentNode.childNodes[1].value = ''
    this_item.style.display = (this_item.style.display == 'block') ? this_item.style.display = 'none' : this_item.style.display = 'block'
  }

  access_list(event) {
    let key = event.target.getAttribute('key5')
    event.stopPropagation()
    this.props.accept_list(key)

  }

  select_priority(event) {
    let item = event.target
    let key = event.target.parentNode.getAttribute('key4')
    if (item.textContent == 'Задать высокий приоритет') {
      this.props.setPriority(1, key)
    }
    else if (item.textContent == 'Задать средний приоритет') {
      this.props.setPriority(2, key)
    }
    else if (item.textContent == 'Задать низкий приоритет') {
      this.props.setPriority(3, key)
    }
    item.parentNode.parentNode.style.display = 'none'
    event.stopPropagation()
  }

 

  textarea_note(event) {
    let min_line_count = 2
    let line_height = 15
    console.log(event.target.scrollTop)
    if (event.target.scrollTop > 0) {
      event.target.style.height = event.target.scrollHeight + "px";
    }
    let min_line_height = min_line_count * line_height;
    let obj = event.target;
    let div = document.getElementById(obj.id + '_div');
    div.innerHTML = obj.value;
    let obj_height = div.offsetHeight;
    if (event.keyCode == 13)
      obj_height += line_height;
    else if (obj_height < min_line_height)
      obj_height = min_line_height;
    obj.style.height = obj_height + 30 + 'px';
  }

  changeText(event) {
    this.substask_text = event.target.value
    console.log(this.substask_text)
  }

  add_note() {
    if (this.note_text.length > 0) {
      let time = logClockTime() + ''
      let text_area = document.getElementById('text_area')
      text_area.value = ''
      this.props.changeNote(this.props.OptionsNumber, this.note_text, time)
      this.note_text = ''

    }
  }
  inputNote(event) {

    this.note_text = event.target.value
    console.log(this.note_text)
  }

  add_subtask() {
    if (this.substask_text.length > 0) {
      let time = new Date()
      let input_subtasks = document.getElementById('input_subtasks')
      let down_div = document.getElementById('down_div')
      down_div.classList.toggle('hidden');
      input_subtasks.value = ''
      this.props.changeSubtasks(this.props.OptionsNumber, this.substask_text, time)
      this.substask_text = ''
    }
  }

  inputSubtask() {
    let down_div = document.getElementById('down_div')
    down_div.classList.remove('hidden');
  }

  select_type(event) {
    this.props.changeType(this.props.OptionsNumber, event.target.textContent, event.target.parentNode.id)
  }

  changeName(e) {
    this.props.changeNameDo(event.target.getAttribute('key3'), e.target.value)
  }



  showOptions(e) {
    this.props.openOptions(e.target.closest('LI').getAttribute('key2'))

  }

  closeDO(e) {
    this.props.onClickDoDelete(e.target.getAttribute('key1'))

  }

  fixState() {
    const toDoList = this.props.toDoList;
    if (FixedList < toDoList) {
      this.props.onClickDoDelete();
      // console.log(FixedList);
    }
  }

  componentDidUpdate() {
    const toDoList = this.props.toDoList;
    toDoListDo += 1;
    for (let i = 0; i < Fixed.length; i++) {
      if (toDoList == i && Fixed[i] == false) {
        Fixed[i] = true;
        createDo();
        if (toDoList < toDoListDo) {
          Fixed[i] = false;
        }
      }
    };



    function createDo() {
      const coordinates = document.getElementById('coordinates');
      const button1 = document.createElement('button');
      // СОЗДАНИЕ ШАБЛОНА ЭЛЕМЕНТА ДЕЛ
      const div = document.createElement('div');
      div.className = 'windows';
      div.id = 'windows';
      div.style.position = 'absolute';
      const header = document.createElement('header');
      button1.id = 'closeWindow';
      button1.className = 'closeWindow';
      div.className = 'draggable';
      header.id = 'elementMove';
      const input = document.createElement("textarea");
      input.className = 'textBox';
      input.placeholder = 'Ну что... Какие дела?';

      FixedList = toDoList;
      button1.onclick = function (e) {
        const qw = e.target.parentNode;
        toDoListDo += 1;
        FixedList -= 1;
        
      }
    }
  }




  showDo(event) {
    let visibleToDo = document.getElementById('visibleToDo')
    let div_visible = event.currentTarget
    let parentItem = div_visible.childNodes[0].lastChild // картинка стрелки
    let this_item = div_visible.parentNode.childNodes[1]
    parentItem.src = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? parentItem.src = arrow_down : parentItem.src = arrow_up
    this_item.style.display = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? this_item.style.display = 'none' : this_item.style.display = 'flex'
  }

  deleteList(event) {
    event.stopPropagation()
    this.props.deleteToDo(event.target.getAttribute('key6'))
  }
  sort(){
    if(this.props.type_sort == 2){
      let newSortArray = [... this.props.colors]
      return newSortArray.sort((a,b) => a.priority - b.priority)
    }
    else if(this.props.type_sort == 1){
      let newTimeArray = [...this.props.colors];
      newTimeArray.sort((a, b) => a.date - b.date);
      return newTimeArray
    } 
    else if(this.props.type_sort == 3){
      return this.props.list_access
    }
    else if(this.props.type_sort == 4){
      let list = [... this.props.colors]
      let sort_array = list.filter(elem => elem.priority == 1)
      return sort_array
    }
    else if(this.props.type_sort == 5){
      let list = [... this.props.colors]
      let sort_array = list.filter(elem => elem.priority == 2)
      return sort_array
    }
    else if(this.props.type_sort == 6){
      let list = [... this.props.colors]
      let sort_array = list.filter(elem => elem.priority == 3)
      return sort_array
    }
    else if(this.props.type_sort == 7){
      let list = [... this.props.colors]
      let sort_array = list.filter(elem => elem.priority == 4)
      return sort_array
    }
    else if(this.props.type_sort == 8){
      let list = [... this.props.colors]
      let sort_array = list.filter(elem => elem.priority == 4)
      return sort_array
    }
    else if(this.props.type_sort == 9){
      let list = [... this.props.colors]
      let date_now = new Date()
      let date_week = new Date().getDate() + 7
      let date_month = new Date().getMonth()
      let sort_array = list.filter(elem => (elem.date.getYear() == date_now.getYear()) && (elem.date.getMonth() == date_month) && ( (date_week > elem.date.getDate()) && (elem.date.getDate() > date_now.getDate() - 1)) )
      return sort_array
    }
    // else if(this.props.type_sort == 8){
    //   let newTimeArray = [... this.props.colors]
    //   let date = new Date();
    //   newTimeArray.filter((a) => date > a.date)
      
    //   return newTimeArray
      
    // }
  }

  showFilters(event){
    let shevronRight = document.getElementById('shevron_right')
    let filters = document.getElementById('list_filter')
    shevronRight.classList.toggle('hidden');
    filters.classList.toggle('hidden')
  }

  render() {
    const Sort_list = this.props.Sort_list
    let arrayToDo = this.props.colors

    const toDoList = this.props.toDoList
    const number = this.props.number
    let arraySort = this.sort()
    
    console.log('111', arraySort)
    
    return (
      <div className='mainWindow' id='coordinates'>
        {console.log(this.props.list_access)}
        <div className="left_menu">
            <div className="left_menu__right_side">
              <ul  className='top_filters'>
                <li onClick={this.sortArrayToDo} >Входящие</li>
                <li onClick={this.sortArrayToDo} >Сегодня</li>
                <li onClick={this.sortArrayToDo} >Следующие 7 дней</li>
              </ul>
              <div className='button_filters' onClick={this.showFilters} >
                  <img src={shevron_right} id='shevron_right'  />
                  Фильтры 
                  </div>
              <div className='filters'>
                  <ul id='list_filter' >
                  <li onClick={this.sortArrayToDo} className='list_filter__item'>
                  <img  src={date_mark} width='20' height='20' />
                     Дата добавления
                     </li> 
                  <li onClick={this.sortArrayToDo} className='list_filter__item'>
                  <img src={priority_mark} width='20' height='20' />
                    По приоритету
                    </li>
                  <li onClick={this.sortArrayToDo}   className='list_filter__item'>
                    <svg fill='#FF3300'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
                    9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
                    5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
                    0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
                  </svg>
                  <span>
                  Высокий приоритет
                  </span>
                    </li>
                  <li onClick={this.sortArrayToDo}  className='list_filter__item'>
                  <svg fill='#FF6600'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
                    9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
                    5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
                    0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
                  </svg>
                  <span>Средний приоритет</span>
                    
                    </li>
                  <li onClick={this.sortArrayToDo}  className='list_filter__item'>
                  <svg fill='#FFCC00'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
                    <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
                    9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
                    5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
                    0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
                  </svg>
                  <span>
                  Низкий приоритет
                  </span>
                    
                    </li>
                  <li onClick={this.sortArrayToDo}  className='list_filter__item'>
                  <img width='20' height='20' src={time_mark}></img>
                  <span>Отложенные</span>
                    
                    </li>
                  <li onClick={this.sortArrayToDo}  className='list_filter__item'>
                  <img width='20' height='20' src={accept_mark}></img>
                  <span>Выполненные</span>
                    
                    </li>
                    {/* <li onClick={this.sortArrayToDo}   className='list_filter__item'>
                    <img width='20' height='20' src={timeout}></img>
                  <span>
                  Просроченные
                  </span>
                    </li> */}
                </ul>
            </div>
          </div>
        </div>
        <ToDoList
          array = {arraySort}
          openOptions = {this.props.openOptions}
         
        />
        <Options
          array = {arraySort}
        />
       
      </div>
    );
  }

}

function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    number: state.select_case,
    type_sort: state.sort,
    list_access: state.List_access,
    overdueItems: state.overdue_items

  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewCase: elemToDo => dispatch(add_case(elemToDo)),
    sort: (array, type_sort) => dispatch(sort_case(array,type_sort)),
    selectedCase: numberCase => dispatch(selected_case(numberCase)),
    changeOverdue: (id, array_overdue) => dispatch(change_overdue(id, array_overdue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Windows);