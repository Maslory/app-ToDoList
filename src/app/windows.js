import React from 'react';
import '../style/style.sass';
import arrow_up from '../img/arrow_up.svg'
import arrow_down from '../img/arrow_down.svg'
import ToDoList from './ToDoList'
import {connect} from "react-redux"
import Options from './Options';
import shevron_right from '../img/arrow_right.svg'
import accept_mark from '../img/priority/accept_mark.svg'
import time_mark from '../img/priority/time_mark.svg'
import date_mark from '../img/priority/date_mark.svg'
import priority_mark from '../img/priority/priority_mark.svg'
import {sort_case, complete_case, selected_case, change_overdue} from './actions/actions';

class Windows extends React.Component {
  constructor(props) {
    super(props);
    this.showDo = this.showDo.bind(this)
    this.inputSubtask = this.inputSubtask.bind(this)
    this.inputNote = this.inputNote.bind(this)
    this.changeText = this.changeText.bind(this)
    this.textarea_note = this.textarea_note.bind(this)
    this.showFilters = this.showFilters.bind(this)
    this.sortArrayToDo = this.sortArrayToDo.bind(this)
    this.substask_text = ''
    this.note_text = ''
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
        let sort_array = list.filter(elem =>  (elem.date.getMonth() == date_month) && ( (date_week > elem.date.getDate()) && (elem.date.getDate() > date_now.getDate())) )
        if(sort_array.length == 0) {
          this.props.selectedCase(-1)
        }
        else{
          this.props.selectedCase(0)
        }
        this.props.sort(sort_array , 9)
      }
  }

  textarea_note(event) {
    let min_line_count = 2
    let line_height = 15
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
  }


  inputNote(event) {
    this.note_text = event.target.value
  }

  inputSubtask() {
    let down_div = document.getElementById('down_div')
    down_div.classList.remove('hidden');
  }

  showDo(event) {
    let visibleToDo = document.getElementById('visibleToDo')
    let div_visible = event.currentTarget
    let parentItem = div_visible.childNodes[0].lastChild // картинка стрелки
    let this_item = div_visible.parentNode.childNodes[1]
    parentItem.src = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? parentItem.src = arrow_down : parentItem.src = arrow_up
    this_item.style.display = (parentItem.src == 'http://localhost:7700/' + arrow_up) ? this_item.style.display = 'none' : this_item.style.display = 'flex'
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
    const number = this.props.number
    let arraySort = this.sort()
    
    return (
      <div className='mainWindow' id='coordinates'>
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