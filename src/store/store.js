import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import Reducer from './Reducer.js'
// applyMiddleware(thunk, promiseMiddleware) 异步操作
// redux-thunk使得redux可以接受函数作为action
const store = createStore(Reducer, applyMiddleware(thunk, promiseMiddleware))
export default store;