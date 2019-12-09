import React from 'react';
import '../style/style.sass';
import { throws } from 'assert';
import add_list from '../img/add_list.svg'
import notepad from '../img/notepad.svg'
import sort_todo from '../img/sort_todo.svg'
import Sort_by_property from './time/Sort_by_property'
import {connect} from "react-redux"
import { add_case, sort_case, selected_case} from './actions/actions';
import logo from '../img/logo_new.svg'
import plusImg from '../img/plus_thin.svg'

class Buttons extends React.Component  {
  constructor(props){
    super(props);
    this.addDo = this.addDo.bind(this);
  
  }


  addDo() {
    if(this.props.OptionsNumber == -1){
      this.props.selectedCase(0)
    }
    this.props.addNewCase('')
  }




  render(){
    return (
      <header className="buttons">
        <span className='margin_buttons_menu' ></span>   
        <img className='logo' src={logo}></img>
        <span>Количество дел : {this.props.colors.length} </span>
        <img className='newToDo' onClick={this.addDo}  alt='создать новое дело' title='создать новое дело' src={plusImg}></img>
      </header>
  );
  }
  
}


function mapStateToProps(state,store, getState) {
  return {
    colors: state.array_case,
    OptionsNumber: state.select_case
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewCase: name_todo => dispatch(add_case(name_todo)) ,
    sort: (array, type_sort) => dispatch(sort_case(array,type_sort)),
    selectedCase: numberCase => dispatch(selected_case(numberCase)),
  };
}

export default  connect(mapStateToProps,mapDispatchToProps)(Buttons);