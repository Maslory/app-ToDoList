import React from "react";
import "../style/style.sass";
import arrow_up from "../img/arrow_up.svg";
import arrow_down from '../img/arrow_down.svg';
import {name_case, add_case} from "./actions/actions"
import { connect } from "react-redux";
import time_mark from '../img/priority/time_mark.svg'
import menu_dot from '../img/menu_dot.svg'
import priority_mark from '../img/priority/priority_mark.svg'
import trash from '../img/trash.svg'
import accept_mark from '../img/priority/accept_mark.svg'
import {remove_case,complete_case, selected_case, priority_case, select_date, change_overdue, selectItem} from "./actions/actions"
import $ from 'jquery';
import DatePicker from 'react-date-picker';
import {useEffect} from 'react'


const months = [
  "Января","Февраля","Марта","Апреля","Мая",
  "Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"
]

const days = [
  "Понедельник","Вторник","Среда","Четверг",
  "Пятница","Суббота","Воскресенье",
]

let hide = 0
let focusoutElem = ''

const ToDoTitle = (props) => {
  let elem = props.elem3
  let selectItemId = props.selectItemId
  let key = props.elemnumber
  let number = props.OptionsNumber
  let array = props.array
  let elemId = props.elemId
  
 

  const changeName = e => {
   
    let item = -1;
    let array = props.colors;
    function logArrayElements(element, index, array) {
     if (element.id == selectItemId){
      item = index;
     }
    }
    array.forEach(logArrayElements);
    // props.changeNameDo(event.target.getAttribute("key3"), e.target.value);
    props.changeNameCase(props.colors[item].id , e.target.value)
  };



  const priorityLogo = () => {
    if( elem.priority == 1) {
      return <svg fill='#FF3300'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
      <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
      9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
      5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
      0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
    </svg>
    }
    else if(elem.priority ==  2){
      return <svg fill='#FF6600'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
      <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
      9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
      5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
      0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
    </svg>
    }
    else if(elem.priority ==  3){
      return <svg fill='#FFCC00'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
      <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
      9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
      5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
      0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
    </svg>
    }
    else if(elem.priority ==  4){
      return  <img width='20' height='20' src={time_mark}></img>
    }
  }





 function closeDO(event) {
  event.stopPropagation()
  let numb = number - 1
  props.selectedCase(number - 1)
  props.removeCase(array[key].id)

}

function completeDo(event){
  event.stopPropagation()
  props.completeCase(array[key].id, array[key])
  closeDO(event)
}

const select_priority = (event) => { 
  let item = event.target
  let ae = event.target.getAttribute('priority')
  if (item.getAttribute('priority') == 'high') {
    props.setPriority(array[key].id, 1)
  }
  else if (item.getAttribute('priority') == 'middle') {
    props.setPriority(array[key].id, 2)
  }
  else if (item.getAttribute('priority') == 'low') {
    props.setPriority(array[key].id, 3)
  }
  let currentTarget = event.currentTarget.parentNode.parentNode
  let menuDot = document.getElementsByClassName('menu_dot__properties');
  let dropDownMenuDot = menuDot[key];
  $(dropDownMenuDot).toggleClass('active');
  document.removeEventListener('click', handler)
  event.stopPropagation()
}


function handler(event) {
  let menuDot = document.getElementsByClassName('menu_dot__properties');
  let dropDownMenuDot = menuDot[key];
  try {
    if (!dropDownMenuDot.contains(event.target) || event.target.tagName == 'menu_dot') {
      dropDownMenuDot.classList.remove('active')
      document.removeEventListener('click', handler)
    }
  } catch (error) {
    console.log('Не могу прочитать элемент, т.к., он был удален (' + error + ')')
  }
}

const showMenuDot = (event) => {
  event.stopPropagation()
  let target = event.currentTarget.parentNode
  let propertyMenu = target.parentNode.childNodes[1]
  
  let menuDot = document.getElementsByClassName('menu_dot__properties');
  let d = menuDot[key];
  $(menuDot[key]).toggleClass('active');
  
  document.addEventListener('click', handler)
  
 
    
   
    
    
  
  // let foc = document.getElementsByClassName('focusout')
  //  $(foc).toggleClass('active');
  
  // propertyMenu.style.display = 'none'
  // (propertyMenu.style.display == 'block') ? propertyMenu.style.display = 'none'
  // : propertyMenu.style.display = 'block';
 }

useEffect(() => {
  
  
  // document.getElementById('focusout').onClick = (event) => {
  //   let foc = document.getElementById('focusout');
  //   alert(foc === event.target)
  //   if(event.currentTarget == event.target){
  //     $('.menu_dot__properties').removeClass('active');
  //   }
  // }

})

//   // document.addEventListener('click', menuCloseClickOutside);
//   // document.addEventListener('touchstart', menuCloseClickOutside);
// })

// function menuClose() {
  
//   let menu = document.getElementById('menu_dot__properties');
  
//   menu.classList.remove('active');
  
// }

const freshness = () => {
  let newTimeArray = [...props.colors]
  let date = new Date();
  // let arrayOverdue = [...this.props.overdueItems]
  // console.log("Изначальный массив: ", newTimeArray)
  // console.log("Сегодняшний день: ", date_now.getDate(), ' год: ', date_now.getYear()
  // , '/n месяц: ', date_now.getMonth())
  // console.log("Сегодняшний день: ", newTimeArray[0].date.getDate(), ' год: ', newTimeArray[0].date.getYear()
  // , '/n месяц: ',  newTimeArray[0].date.getMonth())
  // let filterArray = newTimeArray.filter((elem) => elem.date.getYear() <= date.getYear() && elem.date.getMonth() <= date.getMonth() )
  if(props.sort == 3){
    return ''
  }
  if(newTimeArray[key].date.getDate() < date.getDate() && newTimeArray[key].date.getMonth() <= date.getMonth() && newTimeArray[key].date.getYear() <= date.getYear()   ){
    return 'Проcрочено'
  }
  if(newTimeArray[key].date.getMonth() < date.getMonth() && newTimeArray[key].date.getYear() <= date.getYear()   ){
    return 'Проcрочено'
  }
}

// // Menu Close Click Outside
function selectDate(date) {
  props.setDate(selectItemId, date )
  let menuDot = document.getElementsByClassName('menu_dot__properties');
  let dropDownMenuDot = menuDot[key];
  
  $(dropDownMenuDot).toggleClass('active');
  
}
function stopEvent(event){
  event.stopPropagation()
  console.log(key, selectItemId)
 
  
}

function takeId(event){
  let menuDot = document.getElementsByClassName('menu_dot__properties');
  let dropDownMenuDot = menuDot[key];
  document.removeEventListener('click', handler)
  props.selectItem(event.currentTarget.getAttribute("id"))
}

  return (
   
    <div  className='titleDiv'>
      
      <a className="todo">
      {priorityLogo()}
        <input
          placeholder="Какое дело?"
          autoComplete="off"
          id="input_Do"
          onChange={changeName}
          value={elem.name_todo}
          // onKeyPress={this.enterInput}
          required
        ></input>
        {/* <span>{props.colors[key].name_todo}</span> */}
        <img  onClick={showMenuDot} alt='Открыть меню' id='menu_dot' className='menu_dot' src={menu_dot}/>
        <span></span>
      </a>
      {(props.sort == 3)? '' :
      <div onClick={stopEvent}   className="menu_dot__properties"  >
        <div  id={elemId} onClick={takeId}  className='defer_task'>
        <span>
        <img src={time_mark}></img>
          Отложить задачу
          
            </span>
            <DatePicker
            onChange={selectDate}
            value={elem.date}
            format='y-MM-dd'
            locale="ru-RU"
          />
        </div>
        
        <div className='priority_menu'>
          <span>Приоритет</span>
          <div onClick={select_priority} >
          <svg priority='low' fill='#FFCC00'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
            <path priority='low' d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
            9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
            5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
            0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
          </svg>
          <svg priority='middle' fill='#FF6600'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
            <path priority='middle' d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
            9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
            5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
            0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
          </svg>
          <svg priority='high' fill='#FF3300'  width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
            <path priority='high' d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 
            9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 
            5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 
            0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z"/>
          </svg>
          </div>
        </div>
        <div className='accept_task' onClick={completeDo} >
          <span>
          <img src={accept_mark}></img> Завершить задачу
          </span>
         
        </div>
        <div onClick={closeDO} className='delete_task'>
        <span>
        <img src={trash}></img>
          Удалить задачу
        </span>
          
        </div>
      </div>
      }
  <span className='show_subtasks' >{days[elem.date.getDay()] + ' : '+ elem.date.getDate() + ' ' + months[elem.date.getMonth()]}</span>
    <div className='freshness' >
      {freshness()} 
    </div>
    </div>
  );
  }


function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    OptionsNumber: state.select_case,
    selectItemId: state.select_item,
    sort: state.sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameCase: (numberCase,nameCase) => dispatch(name_case(numberCase, nameCase)),
    removeCase: id => dispatch(remove_case(id)),
    completeCase: (id,item) => dispatch(complete_case(id, item)),
    selectedCase: numberCase => dispatch(selected_case(numberCase)),
    setPriority: (id, priority) => dispatch(priority_case(id,priority)) ,
    setDate: (id, date) => dispatch(select_date(id, date)),
    selectItem: id => dispatch(selectItem(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoTitle);
