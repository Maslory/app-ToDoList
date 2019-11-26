import C from '../constants/constants'
import initialState from '../store/InitialState'
import { v4 } from 'uuid'


export const add_case = (elemToDo) =>
({
    type: C.ADD_CASE,
    id: v4(),
    toDoList: 0,
    name_todo: elemToDo,
    subtasks:[],
    term:'Когда?',
    duration:'Сколько?',
    notes:[], 
    haveSubtask: false,
    haveNote: false, 
    priority: 2, 
    day_of_number: 0, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
    OptionsNumber: 2,
    List_access: [],
    Sort_list: [],
    sort: 1    // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
})


export const selected_case = (numberCase) =>
(
    {
        type: C.SELECTED_CASE,
        OptionsNumber: numberCase,
    }
)

export const name_case = (numberCase, nameCase) =>
(
    {
        type: C.NAME_CASE,
        id: numberCase,
        name: nameCase

    }
)


export const remove_case  = (id) =>
(
    {   
        type: C.REMOVE_CASE,
        id: id
    }
)

export const priority_case = (id, priority) =>
(
    {
        type: C.PRIORITY_CASE,
        id: id,
        priority: priority
    }
)

export const complete_case = (id, item) =>
(
    {
        type: C.COMPLETE_CASE,
        id: id,
        item: item,
    }
)

export const sort_case = (array, type_sort) => (  // TYPE_SORT  1 - СОРТИРОВКА ПО ДАТЕ ДОБАВЛЕНИЯ, 2 - СОРТИРОВКА ПО ПРИОРИТЕТУ
    {
        type: C.SORT_CASE,
        array: array,
        type_sort: type_sort
    }
)

export const settings_case = (id, todo_type, term, duration) => (
    {
        type: C.SETTINGS_CASE,
        todo_type: todo_type,
        term: term,
        duration: duration,
        id: id
    }
)

export const change_note = (id, notes) => (
    {
        type: C.CHANGE_NOTE,
        id: id,
        notes: notes

    }
)

export const change_subtasks = (id, subtasks) => (
    {
        type: C.CHANGE_SUBTASKS,
        id: id,
        subtasks: subtasks,
       

    }
)


