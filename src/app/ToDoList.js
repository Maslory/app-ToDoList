import React from "react";
import "../style/style.sass";
import ToDoTitle from "./ToDoTitle";
import ContentInfo from "./ContentInfo";
import CaseSettings from "./CaseSettings";
import { connect } from "react-redux";
import {selected_case, add_case, selectItem} from "./actions/actions"


const ToDoList = (props) => {
  // let arrayToDo = props.arrayToDo;
  // console.log(props.colors)
  let list = props.array
  
  // if (props.sort == 2) {
  //   arrayToDo = arrayToDo.sort((a, b) => a.priority - b.priority);
  // }
  const OptionsNumber = props.OptionsNumber;
  // const array_subtask = arrayToDo[OptionsNumber].subtasks;
  // const array_notes = arrayToDo[OptionsNumber].notes;

  const showOptions = e => {
    // props.openOptions(e.target.closest("LI").getAttribute("key2"));
    // alert('closest LI key2 = ' + e.target.closest("LI").getAttribute("key2") )
    props.selectedCase(e.target.closest("LI").getAttribute("key2"))
    props.selectItem(e.target.closest("LI").getAttribute("id"))
  };

  const clickButton = e => {
    props.addNewCase('Привет')
  }

  console.log(props.OptionsNumber)
  
  
    
  
  
  return (
    <ul className="ul">
       {
         list.map((elem, key) => (
        <li className="li" id={elem.id} key2={key} onClick={showOptions}>
          
          <ToDoTitle
            key3={key}
            elem3={elem}
          />
          <div id="visibleToDo" key={key}>
            <ContentInfo
              array = {list}
              key1 = {key}
            />
            <CaseSettings
              array = {list}
              key3 = {key}
            />
            
            {/* <CaseSettings
            
            /> */}
          </div>
        </li>
      ))}
    </ul>
  );
};

function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    OptionsNumber: state.select_case,
    sort: state.sort,
    selectItemId: state.select_item
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewCase: elemToDo => dispatch(add_case(elemToDo)),
    selectedCase: numberCase => dispatch(selected_case(numberCase)),
    selectItem: id => dispatch(selectItem(id))
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);