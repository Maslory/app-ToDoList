import React from "react";
import "../style/style.sass";
import ToDoTitle from "./ToDoTitle";
import ContentInfo from "./ContentInfo";
import CaseSettings from "./CaseSettings";
import { connect } from "react-redux";
import {selected_case, add_case, selectItem, change_note, change_subtasks} from "./actions/actions"
import selectedItem from './selectedItem'


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
    props.selectedCase(e.target.closest("LI").getAttribute("elemnumber"))
    props.selectItem(e.target.closest("LI").getAttribute("id"))
  };

  const deleteSubtask = e => {
    if(array_type.getAttribute('namecomponent') == 'Подзадачи') {
      let array_subtasks = [...arrayToDo[number].subtasks]
      let deleteElem = array_subtasks.filter(
        elem => elem.id !== subtaskId
      )
      props.changeSubtasks(arrayToDo[number].id, deleteElem)
    }
  }

  const deleteNote = e => {
    if(array_type.getAttribute('namecomponent') == 'Заметки'){
      let array_notes = [...arrayToDo[number].notes]
      let deleteElem = array_notes.filter(
        elem => elem.id !== subtaskId
      )
      props.changeNote(arrayToDo[number].id, deleteElem)
    }

  }
  
  
    
  
  
  return (
    <ul className="ul">
     
       {
         list.map((elem, key) => (
        <li className="li" id={elem.id} key={elem.id} elemnumber={key} onClick={showOptions}>
        
          <ToDoTitle
            elem3={elem}
            elemId={elem.id}
            elemnumber = {key}
            array = {list}
          />
          <div id="visibleToDo" key={key}>
            {(elem.subtasks.length > 0) ?
            <div className='tasks' >
            <span>Подзадачи</span>
          <ContentInfo
            array = {list[key].subtasks}
            elemnumber = {key}
            elemId={elem.id}
            changeArray={props.changeSubtasks}
            this_array={list[key].subtasks}
          />
          </div>
          : ''
          }
          {(elem.notes.length > 0) ?
            <div className='tasks'>
              <span>Заметки</span>
            <ContentInfo
              array = {list[key].notes}
              elemnumber = {key}
              elemId={elem.id}
              changeArray={props.changeNote}
              this_array={list[key].notes}
            />
            </div>
           : ''
          }
            
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
    selectItem: id => dispatch(selectItem(id)),
    changeNote: (id, array_notes) => dispatch(change_note(id, array_notes)),
    changeSubtasks: (id, array_notes) => dispatch(change_subtasks(id, array_notes)),
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);