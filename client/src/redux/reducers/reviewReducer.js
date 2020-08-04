import {
   CHECK_REVIEW,
   CLEAR_PERMISSION,
   GET_REVIEW_EDIT,
    UPDATE_REVIEW
}from '../types';


const initialState = {
    mode:'',
    productInfo: {}
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
        case GET_REVIEW_EDIT:
            return{
                ...state,
                productInfo: action.payload
            }
        default:
            return state;
    }
    
}
