import React from "react"
import "../style/style.sass"
import { connect } from "react-redux"
import {settings_case, change_note, change_subtasks} from "./actions/actions"
import $ from 'jquery';
import { useEffect } from 'react';
import BlockNotes from './BlockNotes';
import logClockTime from "./time/timer";
import { v4 } from 'uuid'
// import logClockTime from './time/timer'


const Options = (props) => {
    let arrayToDo = props.array
    let number = props.OptionsNumber;
    let note_text = ''

    const select_type = (event) => {
        


        let count = number 
        let type_select = event.target.textContent
        let selected_row = event.target.parentNode.id
     
        console.log(count, type_select, selected_row)
        let list = [...arrayToDo]
        if(selected_row == 'type'){
            props.settings_case( arrayToDo[number].id, type_select, arrayToDo[number].term, arrayToDo[number].duration)
        }
        if(selected_row == 'term'){
          props.settings_case( arrayToDo[number].id, arrayToDo[number].todo_type, type_select, arrayToDo[number].duration)
        }
        if(selected_row == 'duration'){
          props.settings_case( arrayToDo[number].id, arrayToDo[number].todo_type, arrayToDo[number].term, type_select)
        }
      }

      const show_menu = (event) => {
      let this1 = event.currentTarget
      $(this1).attr('tabindex', 1).focus();
      $(this1).toggleClass('active');
      $(this1).find('.dropdown-menu').slideToggle(300);
    
  
      }

      useEffect(() => {
          $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
      });
      $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
      });
      })
    
      const textarea_note = (event) => {
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
    
      const inputNote = (event) => {
        note_text = event.target.value
        console.log(note_text)
      }
    
      const add_note = (event) => {
        if (note_text.length > 0) {
          let array_type = event.target.parentNode.childNodes[0]
          
          let time = logClockTime()
          let text_area = event.target.parentNode.childNodes[1].childNodes[0]
          
          text_area.value = ''
          
          // alert(note_text, time)
          
         
          if(array_type.textContent == "Подзадачи"){
            let array_notes = [...arrayToDo[number].subtasks]
            array_notes.push({id: v4(), text: note_text, time: time})
            props.changeSubtasks(arrayToDo[number].id, array_notes)
          }
          else {
            let array_notes = [...arrayToDo[number].notes]
            array_notes.push({id: v4(), text: note_text, time: time})
            props.changeNote(arrayToDo[number].id, array_notes)
          }
          note_text = ''
        }
      }

      const delete_note = (event) => {
        // alert(array_type)
        
          let array_type = event.currentTarget.parentNode.parentNode
          
          let subtaskId = event.currentTarget.getAttribute('idelem')
         
          // let text_area = event.target.parentNode.childNodes[1].childNodes[0]
          
   
          // if(array_type.textContent == "Подзадачи"){
            
            console.log(array_type.getAttribute('namecomponent'))
          if(array_type.getAttribute('namecomponent') == 'Заметки'){
            let array_notes = [...arrayToDo[number].notes]
            let deleteElem = array_notes.filter(
              elem => elem.id !== subtaskId
            )
            props.changeNote(arrayToDo[number].id, deleteElem)
          }
          else if(array_type.getAttribute('namecomponent') == 'Подзадачи') {
            let array_subtasks = [...arrayToDo[number].subtasks]
            let deleteElem = array_subtasks.filter(
              elem => elem.id !== subtaskId
            )
            props.changeSubtasks(arrayToDo[number].id, deleteElem)
          }
            // array_notes.push({text: note_text, time: time})
            // props.changeSubtasks(arrayToDo[number].id, array_notes)
          // }
          // else{
          //   let array_notes = [...arrayToDo[number].notes]
          //   array_notes.push({text: note_text, time: time})
          //   props.changeNote(arrayToDo[number].id, array_notes)
          // }
          // note_text = ''
        
      }

    

    return (
        <div className='options'>
          <div className='name_todo'>{(props.OptionsNumber > -1) ? arrayToDo[number].name_todo : 'У вас нету дела'}</div>
          <div className='options_div'>
            <div className='block_term'>
              <div id='type_ToDo'> <span>тип:</span>
                <div className="container">
                  <div className="dropdown" onClick={show_menu}>
                    <div className="select"  >
                      <span id='select_type'  >{(props.OptionsNumber > -1) ? arrayToDo[number].todo_type : 'Выберите тип '}</span>
                      <i className="fa fa-chevron-left"></i>
                    </div>
                    <ul className="dropdown-menu" id='type' onClick={select_type}>
                      <li>Личное</li>
                      <li>Работа</li>
                      <li>Дом</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id='type_ToDo'> <span>срок:</span>
                <div className="container">
                  <div className="dropdown" onClick={show_menu}>
                    <div className="select">
                      <span >{(props.OptionsNumber > -1) ? arrayToDo[number].term : 'Выберите срок'}</span>
                      <i className="fa fa-chevron-left"></i>
                    </div>
                    <ul className="dropdown-menu" id='term' onClick={select_type}>
                      <li>Сегодня</li>
                      <li>Завтра</li>
                      <li>Послезатра</li>
                      <li>3 дня</li>
                      <li>4 дня</li>
                      <li>5 дней</li>
                      <li>6 дней</li>
                      <li>7 дней</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id='type_ToDo'> <span>продолжительность:</span>
                <div className="container">
                  <div className="dropdown" onClick={show_menu}>
                    <div className="select">
                      <span id='select_type'>{(props.OptionsNumber > -1) ? arrayToDo[number].duration : 'Выберите продолжительность'}</span>
                      <i className="fa fa-chevron-left"></i>
                    </div>
                    <ul className="dropdown-menu" id='duration' onClick={select_type}>
                      <li  >10 мин</li>
                      <li  >20 мин</li>
                      <li >30 мин</li>
                      <li >40 мин</li>
                      <li >50 мин</li>
                      <li >60 мин</li>
                    </ul>
                  </div>
                </div>
              </div>
              {(props.OptionsNumber > -1)?
              <BlockNotes
              nameComponent = {'Заметки'}
              array = {arrayToDo[number].notes}
              number = {number}
              textarea_note = {textarea_note}
              inputNote = {inputNote}
              add_note = {add_note}
              deleteNote = {delete_note}
           />
           : "Нету дела"
            }
             {(props.OptionsNumber > -1)?
              <BlockNotes
              nameComponent = {'Подзадачи'}
              array = {arrayToDo[number].subtasks}
              number = {number}
              textarea_note = {textarea_note}
              inputNote = {inputNote}
              add_note = {add_note}
              deleteNote = {delete_note}
           />
           : "Нету дела"
            }
              
              {/* <div className='block_notes'>
                <div>Заметки</div>
                <div className="contact-form__input-wrapper">
                  <textarea id="text_area" rows="2" className="contact-form__input contact-form__text"
                    name="text" onKeyUp={textarea_note} onChange={inputNote} placeholder="Введите ваше сообщение"></textarea>
                  <div id="text_area_div"></div>
                </div>
                <button id='button' className='button' onClick={add_note} >Отправить</button>
                <div id='div_note'>
                  <ul className='ul_note_item'>
                    {(arrayToDo[number].haveNote) ? array_notes.map((elem, key) => <li key={key} id='note_item' ><div>{elem.text}</div><span id=''>{elem.time_note}</span></li>) : ''}
                  </ul>
                </div>
              </div>
              <div className='subtasks_div'><div className='name_subtasks'>Подзадачи</div>
                <input placeholder='Какое дело?' onClick={inputSubtask} onChange={changeText} autoComplete='off' required id='input_subtasks'></input>
                <div id='menu_down'>
                  <div id='down_div'>
                    <div id='col_left'><br /></div>
                    <button id='button' className='button' onClick={add_subtask} >Отправить</button>
                  </div>
                </div>
                <div >
                  <ul className='ul_subtask_item'>
                    {(arrayToDo[number].haveSubtask) ? array_subtask.map((elem, key) => <li key={key} id='subtask_item' >{elem.text}<span>{elem.time}</span></li>) : ''}
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
    )
}

function mapStateToProps(state,store, getState) {
    return {
      colors: state.array_case,
      OptionsNumber: state.select_case,
      sort: state.sort
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      addNewCase: elemToDo => dispatch(add_case(elemToDo)),
      selectedCase: numberCase => dispatch(selected_case(numberCase)),
      settings_case: (id,todo_type, term, duration) => dispatch(settings_case(id,todo_type, term, duration)),
      changeNote: (id, array_notes) => dispatch(change_note(id, array_notes)),
      changeSubtasks: (id, array_notes) => dispatch(change_subtasks(id, array_notes)),
    };
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Options)