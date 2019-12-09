import React from "react";
import "../style/style.sass";
import {connect} from "react-redux"
import trash from '../img/trash.svg'
import accept_mark from '../img/priority/accept_mark.svg'
import {selected_case} from "./actions/actions"
import update_task from '../img/update_task.svg'

const ContentInfo = (props) => {
  let key = props.elemnumber
  let arrayToDo = props.array
  const changeArray = props.changeArray 
  let this_array = props.this_array
  // function acceptItem() {

  // }
  function deleteItem(event) {
      let subtaskId = event.currentTarget.getAttribute('idelem')
      let array_notes = [...this_array]
      let deleteElem = array_notes.filter(
        elem => elem.id !== subtaskId
      )
      changeArray(props.colors[key].id, deleteElem)
  }

  function stop (event) {
    // props.selectedCase(key)
    event.stopPropagation()
  }

  function  acceptItem (event) {
    let target = event.target
    let parent = target.parentNode
    // fdb9d6ee0a156ec36282b4412ca281c0.svg
    if(target.src == 'http://localhost:7700/b803f472592f61e17a1b546e861f627f.svg'){
      target.src = update_task
      parent.style.background = "#00FF66"
    }
    else{
      target.src = 'http://localhost:7700/b803f472592f61e17a1b546e861f627f.svg'
      parent.style.background = "#FAFAFA"
    }
    

  }

  return (
    <div className="left_side"  onClick={stop}>
      <ul>
      {arrayToDo.map((elem, key) => (
            <li key={key} id="note_item">
              <img onClick={acceptItem}  src={accept_mark} />
              <div>{elem.text}</div>
              <img idelem={elem.id} onClick={deleteItem} src={trash}/>
            </li>
          ))
        }
      </ul>
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
    selectedCase: numberCase => dispatch(selected_case(numberCase)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentInfo)
