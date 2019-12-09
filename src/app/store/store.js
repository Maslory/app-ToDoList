import {createStore,combineReducers,applyMiddleware} from 'redux'
import initialState from './InitialState'
import {array_case, todo_case, List_access, sort, select_item, select_case, overdue} from '../reducers/reducers'

const logger = store => next => action => {
    let result
    console.groupCollapsed('dispatching', action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
}
const saver = store => next => action => {
    let result = next(action)
    // localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}


export const storeFactory = (state = initialState) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({select_case, array_case, todo_case, List_access, sort, select_item, overdue}),
        // (localStorage['redux-store']) ?
        //     JSON.parse(localStorage['redux-store']) :
            state
    )

            