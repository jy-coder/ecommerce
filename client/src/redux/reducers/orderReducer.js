
import {
    ADD_ITEM_ORDER,
    REMOVE_ITEM_ORDER,
    CONFIRM_ORDER,
    UPDATE_ITEM_ORDER,
    SET_ORDERS_HISTORY,
    LOADING_ORDERS_HISTORY

  } from '../types';

const initialState = {
    orders:[],
    loading: false,
    ordersHistory:[]
   };


   export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_ORDERS_HISTORY:
        return{
          ...state,
          loading: true
        };


      case SET_ORDERS_HISTORY:
        return{
          ...state,
          ordersHistory: action.payload,
          loading: false
        };


      case ADD_ITEM_ORDER:
          
        return {
          ...state,
            orders: [...state.orders, action.payload]
        };

        case REMOVE_ITEM_ORDER:
        return {
            ...state,
            orders: state.orders.filter((order) => order.productId !== action.payload)
            };

      case UPDATE_ITEM_ORDER:
        // console.log(action.id,action.quantity)
        return {
          ...state,
          orders: state.orders.map(order =>
          order.productId === action.id
              ? { ...order, quantity: action.quantity }
              : order
          )
      }






      case CONFIRM_ORDER:
        return initialState
          

      default:
        return state;
    }
    
}
 