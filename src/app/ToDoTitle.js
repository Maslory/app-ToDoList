import React from "react";
import "../style/style.sass";
import arrow_up from "../img/arrow_up.svg";
import arrow_down from '../img/arrow_down.svg';
import {name_case, add_case} from "./actions/actions"
import { connect } from "react-redux";

const ToDoTitle = (props) => {
  let elem = props.elem3
  let key = props.key3
  
  const showDo = event => {
    console.log(props.OptionsNumber)
    
    let visibleToDo = document.getElementById("visibleToDo");
    let div_visible = event.currentTarget;
    let parentItem = div_visible.childNodes[0].lastChild; // картинка стрелки
    let this_item = div_visible.parentNode.childNodes[1];
    parentItem.src =
      parentItem.src == "http://localhost:7700/" + arrow_up
        ? (parentItem.src = arrow_down)
        : (parentItem.src = arrow_up);
    this_item.style.display =
      parentItem.src == "http://localhost:7700/" + arrow_up
        ? (this_item.style.display = "none")
        : (this_item.style.display = "flex");
  };

  const changeName = e => {
    console.log(e.target.value, e.target.getAttribute("key3"));
    // props.changeNameDo(event.target.getAttribute("key3"), e.target.value);
    props.changeNameCase(props.colors[e.target.getAttribute("key3")].id , e.target.value)
  };

 

  return (
   
    <div onClick={showDo}>
  
      <a className="todo">
        <span>{key + 1 + ". "}</span>
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
        <img key1={key} src={arrow_up} />
      </a>
    </div>
  );
};


function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    OptionsNumber: state.select_case
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeNameCase: (numberCase,nameCase) => dispatch(name_case(numberCase, nameCase)),
    

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoTitle);
