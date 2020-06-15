import axios from 'axios';
import {
    ADD_ITEM_ORDER,
    REMOVE_ITEM_ORDER,
    CONFIRM_ORDER

  } from '../types';

export const addToOrder = (item) =>(dispatch) =>{

    dispatch({ type: ADD_ITEM_ORDER, payload: item });
}



export const removeFromOrder = (prodId) =>(dispatch) =>{

    dispatch({ type: REMOVE_ITEM_ORDER, payload: prodId });
}



export const confirmOrder = (orders,prodIdList) => (dispatch) => {
    axios
      .post('shop/addOrder', {orders,prodIdList})
      .then((res) => {
        dispatch({type: CONFIRM_ORDER});
      })
      .catch((err) => {
        console.log(err)
      });
  };