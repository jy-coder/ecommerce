import {
    CHECK_REVIEW

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