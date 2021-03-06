import C from '../constants/constants'
import initialState from '../store/InitialState'
import {dispatch} from "redux"
import {remove_case} from "../actions/actions"
import {getState} from "redux"
import {connect} from "react-redux"


export const todo_case = (state = {}, action) => {

    switch (action.type) {
        case C.SELECT_DATE:
            return (state.id !== action.id) ?
            state :
            {
                id: state.id,
                name_todo: state.name_todo,
                subtasks: state.subtasks,
                term: state.term,
                duration: state.duration,
                notes: state.notes, 
                haveSubtask: state.haveSubtask,
                haveNote: state.haveNote, 
                priority: state.priority, 
                day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                List_access: state.List_access,
                todo_type: state.todo_type,
                date: action.date
            }

        case C.NAME_CASE: 
            return (state.id !== action.id) ? 
                state :
                {  
                    id: state.id,
                    name_todo: action.name,
                    subtasks: state.subtasks,
                    term: state.term,
                    duration: state.duration,
                    notes: state.notes, 
                    haveSubtask: state.haveSubtask,
                    haveNote: state.haveNote, 
                    priority: state.priority, 
                    day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                    List_access: state.List_access,
                    todo_type: state.todo_type,
                    date: state.date
                } 
            
        case C.ADD_CASE:
            return {
                id: action.id,
                name_todo: action.name_todo,
                subtasks:[],
                term:'Когда',
                duration:'Сколько?',
                notes:[], 
                haveSubtask: false,
                haveNote: false, 
                priority: 2, 
                day_of_number: 0, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                List_access: [],
                todo_type: "Выберите тип",
                date: new Date()  // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
            }
                
       case C.PRIORITY_CASE:
            return  (state.id !== action.id) ? 
            state :
            {  
                id: state.id,
                name_todo: state.name_todo,
                subtasks: state.subtasks,
                term: state.term,
                duration: state.duration,
                notes: state.notes, 
                haveSubtask: state.haveSubtask,
                haveNote: state.haveNote, 
                priority: action.priority, 
                day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                List_access: state.List_access,
                todo_type: state.todo_type,
                date: state.date
            } 

            case C.SETTINGS_CASE:
                return  (state.id !== action.id) ? 
                    state :
                        {  
                            id: state.id,
                            name_todo: state.name_todo,
                            subtasks: state.subtasks,
                            term: action.term,
                            duration: action.duration,
                            notes: state.notes, 
                            haveSubtask: state.haveSubtask,
                            haveNote: state.haveNote, 
                            priority: state.priority, 
                            day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                            List_access: state.List_access,
                            todo_type: action.todo_type,
                            date: state.date
                        } 

            case C.CHANGE_NOTE:
                return  (state.id !== action.id) ? 
                    state :
                    {  
                        id: state.id,
                        name_todo: state.name_todo,
                        subtasks: state.subtasks,
                        term: state.term,
                        duration: state.duration,
                        notes: action.notes, 
                        haveSubtask: state.haveSubtask,
                        haveNote: state.haveNote, 
                        priority: state.priority, 
                        day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                        List_access: state.List_access,
                        todo_type: state.todo_type,
                        date: state.date
                    } 

            case C.CHANGE_SUBTASKS:
                return  (state.id !== action.id) ? 
                    state :
                    {  
                        id: state.id,
                        name_todo: state.name_todo,
                        subtasks: action.subtasks,
                        term: state.term,
                        duration: state.duration,
                        notes: state.notes, 
                        haveSubtask: state.haveSubtask,
                        haveNote: state.haveNote, 
                        priority: state.priority, 
                        day_of_number: state.day_of_number, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
                        List_access: state.List_access,
                        todo_type: state.todo_type,
                        date: state.date
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

        case C.SELECT_DATE:
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

export const overdue = (state=[], action) =>{
    switch(action.type){
        case C.CHANGE_OVERDUE:
            return action.overdue

        default:
            return state
    }
}

export default connect()(List_access);