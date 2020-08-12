import {
    SET_PAYMENT,
    RESET_PAYMENT,
    PAYMENT_SUCCESS,
    PAYMENT_FAIL

  } from '../types';



const initialState = {
    payment: false,
    orderNum: '',
    status: ''
  };




  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_PAYMENT:
        return{
           ...state,
           payment: true
      }
      case RESET_PAYMENT:
        return initialState

      case PAYMENT_SUCCESS:
        return{
           ...state,
           orderNum: action.payload,
           status: 'success'
      }
        
      default:
        return state;
    }
  }