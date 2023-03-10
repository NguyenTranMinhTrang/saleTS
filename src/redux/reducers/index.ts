import { combineReducers } from 'redux';
import { AnyAction } from 'redux';

import product from './product';
import chart from './chart';

import types from '../types';

const appReducer = combineReducers({
    product,
    chart,
});

const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === types.CLEAR_REDUX_STATE) {
        state.product = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

