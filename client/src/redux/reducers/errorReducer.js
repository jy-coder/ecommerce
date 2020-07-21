import {
    SET_ERRORS,
    CLEAR_ERRORS
}from '../types';


const initialState = {
    error:'',
    code:0
};


export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
           error: action.payload,
           code: action.code
        };
        case CLEAR_ERRORS:
            return initialState

        default:
            return state;
    }
    
}
