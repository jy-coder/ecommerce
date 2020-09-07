import {
    LOADING_CART ,
    SET_CART,
    ADD_TO_CART,
    ADD_CART_SUCCESS,
    REMOVE_FROM_CART,
    REMOVE_SUCCESS

  } from '../types';
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
        // console.log(err)
      });
  };


  export const addToCart = (prodId) => (dispatch) => {
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
        // console.log(err)
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
        // console.log(err)
      });
  };



