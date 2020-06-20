import {
    SET_ERRORS,
    CLEAR_ERRORS
}from '../types';


const initialState = {
    error:''
};


export default function(state = initialState, action) {
    switch (action.type) {
      case SET_ERRORS:
        return {
          ...state,
           error: action.payload
        };
        case SET_ERRORS:
            return initialState

        default:
            return state;
    }
    
}
