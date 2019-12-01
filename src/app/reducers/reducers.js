import C from '../constants/constants'
import initialState from '../store/InitialState'
import {dispatch} from "redux"
import {remove_case} from "../actions/actions"
import {getState} from "redux"
import {connect} from "react-redux"

export const todo_case = (state = {}, action) => {

    switch (action.type) {

        case C.NAME_CASE: 
            return (state.id !== action.id) ? 
                state :
                {  
                    id: state.id,
                    toDoList: state.toDoList,
                    name_todo: action.name,
                    subtasks: state.subtasks,
                    term: state.term,
                    duration: state.duration,
                    notes: state.notes, 
                    haveSubtask: state.haveSubtask,
                    haveNote: state.haveNote, 
                    priority: state.priority, 
                    day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                    OptionsNumber: action.number,
                    List_access: state.List_access,
                    Sort_list: state.Sort_list,
                    todo_type: state.todo_type,
                } 
            
        case C.ADD_CASE:
            return {
                id: action.id,
                toDoList: 0,
                name_todo: action.name_todo,
                subtasks:[],
                term:'Когда?',
                duration:'Сколько?',
                notes:[], 
                haveSubtask: false,
                haveNote: false, 
                priority: 2, 
                day_of_number: 0, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                OptionsNumber: 0,
                List_access: [],
                Sort_list: [],
                todo_type: "Выберите тип",   // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
            }
                
       case C.PRIORITY_CASE:
            return  (state.id !== action.id) ? 
            state :
            {  
                id: state.id,
                toDoList: state.toDoList,
                name_todo: state.name_todo,
                subtasks: state.subtasks,
                term: state.term,
                duration: state.duration,
                notes: state.notes, 
                haveSubtask: state.haveSubtask,
                haveNote: state.haveNote, 
                priority: action.priority, 
                day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                OptionsNumber: state.OptionsNumber,
                List_access: state.List_access,
                Sort_list: state.Sort_list,
                todo_type: state.todo_type,
            } 

            case C.SETTINGS_CASE:
                return  (state.id !== action.id) ? 
                    state :
                        {  
                            id: state.id,
                            toDoList: state.toDoList,
                            name_todo: state.name_todo,
                            subtasks: state.subtasks,
                            term: action.term,
                            duration: action.duration,
                            notes: state.notes, 
                            haveSubtask: state.haveSubtask,
                            haveNote: state.haveNote, 
                            priority: state.priority, 
                            day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                            OptionsNumber: state.OptionsNumber,
                            List_access: state.List_access,
                            Sort_list: state.Sort_list,
                            todo_type: action.todo_type,
                        } 

            case C.CHANGE_NOTE:
                return  (state.id !== action.id) ? 
                    state :
                    {  
                        id: state.id,
                        toDoList: state.toDoList,
                        name_todo: state.name_todo,
                        subtasks: state.subtasks,
                        term: state.term,
                        duration: state.duration,
                        notes: action.notes, 
                        haveSubtask: state.haveSubtask,
                        haveNote: state.haveNote, 
                        priority: state.priority, 
                        day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                        OptionsNumber: state.OptionsNumber,
                        List_access: state.List_access,
                        Sort_list: state.Sort_list,
                        todo_type: state.todo_type,
                    } 

            case C.CHANGE_SUBTASKS:
                return  (state.id !== action.id) ? 
                    state :
                    {  
                        id: state.id,
                        toDoList: state.toDoList,
                        name_todo: state.name_todo,
                        subtasks: action.subtasks,
                        term: state.term,
                        duration: state.duration,
                        notes: state.notes, 
                        haveSubtask: state.haveSubtask,
                        haveNote: state.haveNote, 
                        priority: state.priority, 
                        day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                        OptionsNumber: state.OptionsNumber,
                        List_access: state.List_access,
                        Sort_list: state.Sort_list,
                        todo_type: state.todo_type,
                    } 

            
        default:
            return state
    }
}

export const array_case = (state = initialState.array_case, action) => {
    switch (action.type) {
        case C.ADD_CASE:
            return [
                ...state,
                todo_case({}, action)
            ]

        case C.REMOVE_CASE:
            return state.filter(
                c => c.id !== action.id
            )

        case C.NAME_CASE:
            return state.map(
                c => todo_case(c, action))

        case C.PRIORITY_CASE:
            return state.map(
                c => todo_case(c, action)
            )
       
        case C.SETTINGS_CASE:
                return state.map(
                    c => todo_case(c, action)
                )

        case C.CHANGE_NOTE:
            return state.map(
                c => todo_case(c, action)
            )

        case C.CHANGE_SUBTASKS:
            return state.map(
                c => todo_case(c, action)
            )
        

        default:
            return state
    }
}

export const List_access = (state = initialState.List_access, action) => {
    switch(action.type){
        case C.COMPLETE_CASE:
            return [
                ...state,
                action.item
            ]

        default:
            return state
    }
} 


export const select_case = (state= 0, action) => {

    switch(action.type){
        case C.SELECTED_CASE:
            return action.OptionsNumber

        default:
            return state
    }
}

export const sort = (state = 1, action) => {
    switch(action.type){
        case C.SORT_CASE:
            return action.type_sort

        default:
            return state
    }
}

export const select_item = (state = -1, action) => {
    switch(action.type){
        case C.SELECT_ITEM:
            return action.id

        default:
            return state
    }
}



function mapStateToProps(state,store, getState) {
    return {
      colors: state,
      OptionsNumber: state.select_case
    };
  }
  
  
export default connect(mapStateToProps)(List_access);