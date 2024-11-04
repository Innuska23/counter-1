import { combineReducers, legacy_createStore, compose } from 'redux'
import { counterReducer } from '../../features/counter/model/counter-reducer'

const rootReducer = combineReducers({
    counter: counterReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
    rootReducer,
    composeEnhancers()
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store