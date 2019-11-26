import React from "react";
import "../style/style.sass";
import { connect } from "react-redux";
import { add_case } from "./actions/actions";

const ToDoShow = props => {
  let elemToDo;
  const add = event => {
    event.preventDefault();
    console.log(props.array_case);
    console.log("Успешно!");
    props.addNewCase(elemToDo.value);
    elemToDo.value = "";
  };

  const show = event => {
    console.log(props.colors);
  };

  return (
    <div>
      {console.log(props.colors)}
      <form onSubmit={add}>
        <input
          ref={input => (elemToDo = input)}
          type="text"
          placeholder="color title..."
          required
        />
        <button>Добавить дело</button>
      </form>
      <button onClick={show}>Показать</button>
      <ul>
        {props.colors.map((elem, key) => (
          <li key={key}>{elem.name_todo}</li>
        ))}
      </ul>
    </div>
  );
};

// class ToDoShow extends React.Component {
//     constructor(props) {
//         super(props);
//         this.add = this.add.bind('this')
//         this.addNewCase = this.props.addNewCase(this.elemToDo)
//         this.elemToDo
//         };

//         add(event){
//             event.preventDefault()
//             console.log('Успешно!')
//             props.addNewCase(this.elemToDo)
//             this.elemToDo = ''
//         }

//         render(){
//             return(
//                 <form>
//                     <input ref={input => this.elemToDo = input}
//                         type="text"
//                         placeholder="color title..." required
//                     />
//                     <button onClick={this.add}>Добавить дело</button>
//                 </form>
//             )
//         }
//     }

function mapStateToProps(state, getState) {
  return {
    colors: state.array_case
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewCase: elemToDo => dispatch(add_case(elemToDo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoShow);
