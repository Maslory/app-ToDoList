import {createStore,combineReducers,applyMiddleware} from 'redux'
import initialState from './InitialState'
import {array_case, todo_case, select_case, List_access, sort, select_item, overdue_items} from '../reducers/reducers'

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
        combineReducers({array_case, todo_case, select_case, List_access, sort, select_item, overdue_items}),
        // (localStorage['redux-store']) ?
        //     JSON.parse(localStorage['redux-store']) :
            state
    )

            