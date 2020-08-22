import {
SET_PAYMENT,
RESET_PAYMENT,
PAYMENT_FAIL,
PAYMENT_SUCCESS,
LOADING_PAYMENT
} from '../types';
import history from './../../utils/history'
import axios from '../../utils/axios-handler';


  export const resetPayment = () => (dispatch) => {
    dispatch({ type: RESET_PAYMENT });
  };

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