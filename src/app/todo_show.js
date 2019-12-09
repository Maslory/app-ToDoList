// import React from "react";
// import "../style/style.sass";
// import { connect } from "react-redux";
// import { add_case } from "./actions/actions";

// const ToDoShow = props => {
//   let elemToDo;
//   const add = event => {
//     event.preventDefault();
//     props.addNewCase(elemToDo.value);
//     elemToDo.value = "";
//   };



//   return (
//     <div>
//       <form onSubmit={add}>
//         <input
//           ref={input => (elemToDo = input)}
//           type="text"
//           placeholder="color title..."
//           required
//         />
//         <button>Добавить дело</button>
//       </form>
//       <button >Показать</button>
//       <ul>
//         {props.colors.map((elem, key) => (
//           <li key={key}>{elem.name_todo}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// function mapStateToProps(state, getState) {
//   return {
//     colors: state.array_case
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addNewCase: elemToDo => dispatch(add_case(elemToDo))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ToDoShow);
