import {
    SET_PAYMENT,
    RESET_PAYMENT,
    PAYMENT_SUCCESS,
    LOADING_PAYMENT

  } from '../types';



const initialState = {
    payment: false,
    orderNum: '',
    status: '',
    loading:false
  };




  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_PAYMENT:
        return{
          loading:true
        }
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
           status: 'success',
           loading: false
      }
        
      default:
        return state;
    }
  }