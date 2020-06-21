import {
   CHECK_REVIEW,
   CLEAR_PERMISSION
}from '../types';


const initialState = {
    mode:'',
};


export default function(state = initialState, action) {
    switch (action.type) {
      case CHECK_REVIEW:
        return {
          ...state,
           mode: action.payload
        };
        case CLEAR_PERMISSION:
            return initialState;

        default:
            return state;
    }
    
}
