import {
    SET_ERRORS,
    LOADING_CART ,
    SET_CART,
    CLEAR_ERRORS,
    ADD_TO_CART,
    ADD_CART_SUCCESS,
    REMOVE_FROM_CART,
    CLEAR_CART,
    INCREASE_QUANTITY,
    CONFIRM_ORDER,
    REMOVE_SUCCESS

  } from '../types';
  import history from './../../utils/history'
  import axios from '../../utils/axios-handler';


  export const getCart = () => (dispatch) => {
    dispatch({ type: LOADING_CART });
    axios
      .get('shop/cart')
      .then((res) => {
        dispatch({
          type: SET_CART,
          payload: res.data
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };


  export const addToCart = (prodId) => (dispatch) => {
    console.log(prodId)
    dispatch({type: ADD_TO_CART})
    axios
      .post('shop/addcart', {prodId})
      .then((res) => {
        dispatch({
          type: ADD_CART_SUCCESS,
          payload:res.data
        });
      })
      .catch((err) => {
        console.log(err)
      });
  };





  export const removeFromCart = (prodId) => (dispatch) => {
    dispatch({type: REMOVE_FROM_CART})
    axios
      .delete(`shop/deleteCartItem/${prodId}`)
      .then((res) => {
        dispatch({
          type: REMOVE_SUCCESS,
          payload: res.data
        });
     
      })
      .catch((err) => {
        console.log(err)
      });
  };



