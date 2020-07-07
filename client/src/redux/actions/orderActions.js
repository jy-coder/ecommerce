import axios from '../../utils/axios-handler';
import history from '../../utils/history';
import {
    ADD_ITEM_ORDER,
    REMOVE_ITEM_ORDER,
    CONFIRM_ORDER,
    UPDATE_ITEM_ORDER,
    SET_ORDERS_HISTORY,
    LOADING_ORDERS_HISTORY

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
        history.push('/stripe')
      })
      .catch((err) => {
        
      });
  };


  export const getOrders = () => (dispatch) => {
    dispatch({type: LOADING_ORDERS_HISTORY});
    axios
      .get('shop/getOrders')
      .then((res) => {
        dispatch({type: SET_ORDERS_HISTORY, payload:res.data});
        
      })
      .catch((err) => {
       
      });
  };


  export const updateItemQuantity = (id, quantity) => (dispatch) => {
    dispatch({type: UPDATE_ITEM_ORDER, id:id, quantity:quantity });
    

  };