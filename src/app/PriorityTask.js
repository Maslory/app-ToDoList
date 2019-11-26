import React from "react";
import "../style/style.sass";
import {connect} from 'react-redux'
import list_priority from '../img/list_priority.svg'
import {priority_case} from "./actions/actions"

const PriorityTask = (props) => {
  let arraynumber = props.arraynumber
  let array = props.array
  

  const set_priority = (event) => {  
      let this_item = event.target.parentNode.childNodes[1]
      this_item.style.display = (this_item.style.display == 'block') ? this_item.style.display = 'none' : this_item.style.display = 'block'

  }

  const select_priority = (event) => { 
      let item = event.target
      if (item.textContent == 'Задать высокий приоритет') {
        props.setPriority(array[arraynumber].id, 1)
      }
      else if (item.textContent == 'Задать средний приоритет') {
        props.setPriority(array[arraynumber].id, 2)
      }
      else if (item.textContent == 'Задать низкий приоритет') {
        props.setPriority(array[arraynumber].id, 3)
      }
      item.parentNode.parentNode.style.display = 'none'
      event.stopPropagation()
  }
 
  return (                         // lI ЭЛЕМЕНТЫ ВЫВОДИТЬ С АТРИБУТАМИ И ПО НИМ ПРИСВАИВАТЬ ПРИОРИТЕТ
    <span id="priority_span">
      <img
        onClick={set_priority}
        alt="Задать приоритет"
        title="Задать приоритет"
        src={list_priority}
      ></img>
      <div id="priority_menu">
        <ul onClick={select_priority} arraynumber={arraynumber}> 
          <li>Задать высокий приоритет</li>
          <li>Задать средний приоритет</li>
          <li>Задать низкий приоритет</li>
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(PriorityTask)