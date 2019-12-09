import React from "react";
import "../style/style.sass";
import CompleteDeleteTask from "./CompleteDeleteTask";
import DeferTask from "./DeferTask";
import PriorityTask from "./PriorityTask";
import {connect} from "react-redux"
import access_list from '../img/access_list.svg'
import delete_list from '../img/delete_list.svg'
import {remove_case,complete_case, selected_case, change_note} from "./actions/actions"

const CaseSettings = (props) => {
  let key = props.elemnumber
  let array = props.array
  let number = props.OptionsNumber
  let elemId = props.elemId
  console.log("ТУТ", props.storeArray ) 
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

  return (
    <div className="right_side">
      {/* <DeferTask /> */}
      <PriorityTask
        arraynumber={key}
        array={array}
      />
      <DeferTask
        arraynumber={key}
        array={array}
      />
      <CompleteDeleteTask
        array={array}
        onClick={completeDo}
        list={access_list}
        altImg={'Завершить дело'}
        titleImg={'Завершить дело'}
      />
      <CompleteDeleteTask
        array={array}
        onClick={closeDO}
        list={delete_list}
        altImg={'Удалить дело'}
        titleImg={'Удалить дело'}        
      />
    </div>
  );
};

function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    OptionsNumber: state.select_case,
    storeArray: state 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewCase: name_todo => dispatch(add_case(name_todo)) ,
    removeCase: id => dispatch(remove_case(id)),
    completeCase: (id,item) => dispatch(complete_case(id, item)),
    selectedCase: numberCase => dispatch(selected_case(numberCase)),
    changeNotes: (id, array_notes) => dispatch(change_note(id, array_notes))
  
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseSettings)
