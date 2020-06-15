
import {
    ADD_ITEM_ORDER,
    REMOVE_ITEM_ORDER,
    CONFIRM_ORDER

  } from '../types';

const initialState = {
    orders:[]
   };


   export default function(state = initialState, action) {
    switch (action.type) {
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





        default:
        return state;
    }
    
}
 