import {
    SET_PRODUCTS,
    LOADING_PRODUCTS,
    DELETE_PRODUCT,
    POST_PRODUCT,
    SET_PRODUCT,
    LOADING_PRODUCT,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_ERRORS,

  } from '../types';
  import axios from 'axios';
  
  // Get all screams
  export const getProducts = () => (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    axios
      .get('shop/')
      .then((res) => {
        dispatch({
          type: SET_PRODUCTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_PRODUCTS,
          payload: []
        });
      });
  };
  export const getProduct = (productId) => (dispatch) => {
    dispatch({ type: LOADING_PRODUCT });
    axios
      .get(`shop/product/${productId}`)
      .then((res) => {
        dispatch({
          type: SET_PRODUCT,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };

  export const addProduct = (newProduct) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/admin/addproducts', newProduct)
      .then((res) => {
        dispatch({
          type: POST_PRODUCT,
          payload: res.data
        });
        // dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  



  