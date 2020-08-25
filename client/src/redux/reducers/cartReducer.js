import {
    LOADING_CART ,
    SET_CART,
    ADD_CART_SUCCESS,
    ADD_TO_CART,
    CONFIRM_ORDER,
    REMOVE_SUCCESS

  } from '../types';


  const initialState = {
   cartItems: [],
   loading: false,
   message: '',
   orders: []
  };

  export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
      case LOADING_CART:
        return {
          ...state,
          loading: true,
          message:''
        };

        case REMOVE_SUCCESS:
        case SET_CART:
          return {
            ...state,
            cartItems:action.payload,
            loading: false,
            message:''
          };



        case ADD_CART_SUCCESS:
        return {
            ...state,
            loading: false,
            message:action.payload
        };


        case CONFIRM_ORDER:
          return {
            ...state,
            loading: false,
            message:'',
            order: action.payload
        };
        default:
        return state;
    }
    
}