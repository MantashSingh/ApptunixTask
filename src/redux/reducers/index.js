import { combineReducers } from 'redux';

import main from "./main";
import types from '../types';



const appReducer = combineReducers({

    main

});

const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;