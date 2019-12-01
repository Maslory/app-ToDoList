import React from "react";
import "../style/style.sass";
import arrow_up from "../img/arrow_up.svg";
import arrow_down from '../img/arrow_down.svg';
import {name_case, add_case} from "./actions/actions"
import { connect } from "react-redux";

const ToDoTitle = (props) => {
  let elem = props.elem3
  let key = props.key3
  let selectItemId = props.selectItemId
  
  
  const showDo = event => {
    console.log(props.OptionsNumber)
    let visibleToDo = document.getElementById("visibleToDo");
    let div_visible = event.currentTarget;
    let parentItem = div_visible.childNodes[0].firstChild; // картинка стрелки
    let this_item = div_visible.parentNode.childNodes[1];
    
    
    this_item.style.display = (this_item.style.display == 'flex')
    ? this_item.style.display = "none"
    : this_item.style.display = "flex"
    parentItem.classList.toggle('hidden');
  };

  const changeName = e => {
    console.log(e.target.value, e.target.getAttribute("key3"));
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





 

  return (
   
    <div onClick={showDo} className='titleDiv'>
  
      <a className="todo">
      <img key1={key} className='marker' src={arrow_up} />
        <input
          placeholder="Какое дело?"
          autoComplete="off"
          id="input_Do"
          key3={key}
          onChange={changeName}
          value={elem.name_todo}
          // onKeyPress={this.enterInput}
          required
        ></input>
        {/* <span>{props.colors[key].name_todo}</span> */}
        
      </a>
    </div>
  );
};


function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    OptionsNumber: state.select_case,
    selectItemId: state.select_item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameCase: (numberCase,nameCase) => dispatch(name_case(numberCase, nameCase)),
    

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoTitle);
