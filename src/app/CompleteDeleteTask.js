import React from "react";
import "../style/style.sass";
import {connect} from "react-redux"

const CompleteDeleteTask = (props) => { //common переиспользуемый компонент, удаляет, либо завершает дело
  let key = props.key
  let list = props.list
  let altImg = props.altImg
  let titleImg = props.titleImg
  const onClick = props.onClick


  console.log(key)
  return (
    <span>
      {" "}
      <img
        key={key}
        onClick={onClick}        //{this.access_list}
        alt={altImg}    //"завершить"
        title={titleImg}          //"Завершить дело"
        src={list}
      ></img>
    </span>
  );
};



export default CompleteDeleteTask