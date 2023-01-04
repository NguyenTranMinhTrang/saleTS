import reducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const middlewares = [thunk];

export default createStore(reducer, applyMiddleware(...middlewares));
