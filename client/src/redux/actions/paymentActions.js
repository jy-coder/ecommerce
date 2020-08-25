import {
SET_PAYMENT,
PAYMENT_SUCCESS,
LOADING_PAYMENT
} from '../types';
import axios from '../../utils/axios-handler';



  export const setPayment = () => (dispatch) => {
    dispatch({ type: SET_PAYMENT });
  };


  export const makePayment= (id, totalPrice,orders,prodIdList) => (dispatch) => {
    dispatch({ type: LOADING_PAYMENT });
    axios
    .post('shop/charge', { id, amount: totalPrice,orders,prodIdList })
    .then((res) => {
      dispatch({
        type: PAYMENT_SUCCESS,
        payload: res.data
      });
 
    })
    .catch((err) => {

    });
  };