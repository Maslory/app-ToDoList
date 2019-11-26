import React from "react";
import "../style/style.sass";
import {connect} from "react-redux"

const ContentInfo = (props) => {
  let key = props.key1
  let arrayToDo = props.array
  // console.log(props)
  return (
    <div className="left_side">
      задача отложена на: дата + кол-во дней {} <br />
      приоритет: {arrayToDo[key].priority} <br />
      подзадачи: сортировка по дате добавления, иконки выполнено и не выполнено
      {arrayToDo[key].haveSubtask
        ? arrayToDo[key].subtasks.map((elem, key) => (
            <li key={key} id="subtask_item">
              {elem.text}
              <span>{elem.time}</span>
            </li>
          ))
        : ""}
    </div>
  );
};

function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    OptionsNumber: state.select_case
  };
}

export default connect(mapStateToProps)(ContentInfo)
