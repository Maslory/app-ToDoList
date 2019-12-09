import { v4 } from 'uuid'
import { get } from 'http'


const initialState = {

    array_case: [
        {
            id: v4(),
            name_todo: 'Помыть посуду',
            subtasks:[],
            term:'Когда?',
            duration:'Сколько?',
            notes:[], 
            haveSubtask: false,
            haveNote: false, 
            priority: 2, 
            day_of_number: 0, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
            List_access: [],
            todo_type: "Выберите тип",   // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
            date: new Date()
        },
        // {
        //     id: v4(),
        //     name_todo: 'второй',
        //     subtasks:[],
        //     term:'Когда?',
        //     duration:'Сколько?',
        //     notes:[], 
        //     haveSubtask: false,
        //     haveNote: false, 
        //     priority: 2, 
        //     day_of_number: 0, // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
        //     List_access: [],
        //     todo_type: "Тип",   // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце
        // },
    ], // prioritet  1 - высокий приоритет 2 - средний приоритет 3 - низкий приоритет 4 - задача отложена
    List_access: [],
    overdue: [],
    sort: 1, // 1-по дате добавления, 2-по приоритету, отложенные задачи в самом конце   
}

export default initialState