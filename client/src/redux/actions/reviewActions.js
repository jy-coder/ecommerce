import {
    CHECK_REVIEW
    ,GET_REVIEW_EDIT,
    UPDATE_REVIEW,
    ADD_REVIEW

  } from '../types';
  import axios from '../../utils/axios-handler';


  export const getReviewPermission= (prodId) => (dispatch) => {
    axios
      .post('shop/checkReview', {prodId})
      .then((res) => {

        dispatch({
          type: CHECK_REVIEW,
          payload:res.data
        });
      })
      .catch((err) => {
        
      });
  };


  export const getReviewEdit= (prodId) => (dispatch) => {
    axios
      .get(`shop/getMyReview/${prodId}`)
      .then((res) => {
        dispatch({
          type: GET_REVIEW_EDIT,
          payload:res.data
        });
      })
      .catch((err) => {
        
      });
  };


  export const updateReview= (prodId,text) => (dispatch) => {
    axios
      .patch(`shop/updateReview/${prodId}`,{text})
      .then((res) => {
        dispatch({
          type: UPDATE_REVIEW
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