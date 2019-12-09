import React from "react";
import "../style/style.sass";
import {connect} from 'react-redux'
import list_defer from '../img/list_defer.svg'
import {priority_case} from "./actions/actions"



const DeferTask = (props) => {

  let arraynumber = props.arraynumber
  let array = props.array
  

  const select_priority = (event) => {   //СДЕЛАТЬ IF ЕСЛИ УЖЕ СООТВЕСТВУЕТ ДАННОМУ ПРИОРИТЕТУ, ТОГДА ПРОПУСКАТЬ ВЫЗОВ РЕДЬЮСЕРА
    let item = event.target
    let this_item = item.parentNode.childNodes[1]
    item.parentNode.childNodes[1].childNodes[1].value = ''
    hide_element(item, this_item)
  }

  const hide_element = (item, item_hide) => {
    
    item_hide.style.display = (item_hide.style.display == 'block') ? item_hide.style.display = 'none' : item_hide.style.display = 'block'
  }

  const set_priority = (event) => { 
    let item = event.target
    let this_item = item.parentNode
    item.parentNode.childNodes[1].value = ''
    props.setPriority(array[arraynumber].id, 4)
    hide_element(item, this_item)
    event.stopPropagation()
  }

  return (
    <span id="defer_task">
      <img
        onClick={select_priority}
        alt="отложить_задачу"
        title="Отложить задачу"
        src={list_defer}
      ></img>
      <div id="task_menu">
        Задача отложена на
        <input></input> дней <br />
        <button onClick={set_priority}>
          Отложить
        </button>
      </div>
    </span>
  );
};


function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPriority: (id, priority) => dispatch(priority_case(id,priority)) ,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeferTask)