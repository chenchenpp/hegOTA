import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import Reducer from './Reducer.js'
const store = createStore(Reducer, applyMiddleware(thunk, promiseMiddleware))
export default store;