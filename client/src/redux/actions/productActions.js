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
    ADD_REVIEW,
    EDIT_REVIEW,
    DELETE_REVIEW,
    CHECK_REVIEW,
    UPDATE_PRODUCT

  } from '../types';
  import axios from '../../utils/axios-handler';
  import history from '../../utils/history';
  
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

      });
  };

  export const getProduct = (productId) => (dispatch) => {
    dispatch({ type: LOADING_PRODUCT });
    axios
      .get(`shop/product/${productId}`)
      .then((res) => {

        dispatch({ type: SET_PRODUCT, payload: res.data })
        
      })
      .catch((err) => {

      });
  };



  export const deleteProduct = (productId) => (dispatch) => {
    // dispatch({ type: LOADING_PRODUCT });
    axios
      .delete(`admin/deleteproduct/${productId}`)
      .then((res) => {
        dispatch({ type: DELETE_PRODUCT })
        history.go(0)
      })
      .catch((err) => {

      });
  };



  export const getAdminProducts = () => (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    axios
      .get(`admin/edit`)
       .then((res) => {
        dispatch({
          type: SET_PRODUCTS,
          payload: res.data
        });
      })
      .catch((err) => {

      });
  };

  export const addProduct = (newProduct) => (dispatch) => {
    // dispatch({ type: LOADING_UI });
    axios
      .post('admin/addproducts', newProduct)
      .then((res) => {
        dispatch({
          type: POST_PRODUCT,
          
        });
        
      })
      .catch((err) => {
       
      });
  };




  export const updateProduct = (productId,updatedProduct) => (dispatch) => {
    axios
      .patch(`admin/edit/${productId}`, updatedProduct)
      .then((res) => {
        dispatch({
          type: UPDATE_PRODUCT,
        });
        
      })
      .catch((err) => {
       
      });
  };

  export const addReview = ({prodId, text, rating}) => (dispatch) => {
    axios
      .post('shop/addReview', {prodId, text, rating})
      .then((res) => {
        dispatch({
          type: ADD_REVIEW,
          payload:res.data
        });
      })
      .catch((err) => {
        
      });
  };





  



  