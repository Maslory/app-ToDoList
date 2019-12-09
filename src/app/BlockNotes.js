import React from "react"
import "../style/style.sass"
import { connect } from "react-redux"
import {change_note} from "./actions/actions"
import $ from 'jquery';
import { useEffect } from 'react';
import { v4 } from 'uuid'
import deleteElem from '../img/deleteElem.svg'





const BlockNotes = (props) => {
    let arrayToDo = props.array;
    let number = props.number;
    let array_notes = props.array
    const inputNote = props.inputNote
    const add_note = props.add_note
    let note_text = '';
    const deleteNote = props.deleteNote

    const textarea_note = (event) => {
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

    return(
        <div className='block_notes'>
<div className='block_note__name'>{props.nameComponent}</div>
             <div className="contact-form__input-wrapper">
               <textarea id="text_area" rows="2" className="contact-form__input contact-form__text"
                 name="text" onKeyUp={textarea_note} onChange={inputNote} placeholder="Введите ваше сообщение"></textarea>
               <div id="text_area_div"></div>
             </div>
             <button id='button' className='button' onClick={add_note} >Отправить</button>
             <div id='div_note'>
               <ul className='ul_note_item' namecomponent={props.nameComponent}>
                 {array_notes.map((elem, key) => <li key={key} id='note_item'  >
                   <div>
                     {elem.text}
                   </div>
                   <img idelem={elem.id} onClick={deleteNote}  alt='Удалить элемент массива' title='Удалить элемент массива' src={deleteElem} />
                   <span id=''>{elem.time}</span>
                   
                   </li>) }
               </ul>
             </div> 
      </div>
    )

}

function mapDispatchToProps(dispatch) {
  return {
    change_notes: (id, array_notes) => dispatch(change_note(id, array_notes))
  };
}

function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
  };
}

export default connect( mapStateToProps, mapDispatchToProps)(BlockNotes)