import { v4 } from 'uuid'

const initialState = {
    toDoList: 0,
    array_case: [
        {
            id: v4(),
            toDoList: 0,
            name_todo: 'Помыть посуду',
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
        },
        // {
        //     id: v4(),
        //     toDoList: 0,
        //     name_todo: 'второй',
        //     subtasks:[],
        //     term:'Когда?',
        //     duration:'Сколько?',
        //     notes:[], 
        //     haveSubtask: false,
        //     haveNote: false, 
        //     priority: 2, 
        //     day_of_number: 0, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
        //     OptionsNumber: 0,
        //     List_access: [],
        //     Sort_list: [],
        //     todo_type: "Тип",   // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
        // },
    ], // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
    OptionsNumber: 0,
    selectItem: -1,
    List_access: [],
    Sort_list: [],
    sort: 1    // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
}

export default initialState