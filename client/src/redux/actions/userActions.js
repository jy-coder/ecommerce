import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER,
    SET_UNAUTHENTICATED,
  } from '../types';
  import history from '../../utils/history'
  import axios from 'axios';
  
  export const loginUser = ({ email, password }) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('user/login', { email, password })
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const signupUser = ({ name, email, password, confirmPassword }) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('user/signup', { name, email, password, confirmPassword })
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS });
        history.push('/login');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  };


  export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('user/getUser')
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };


  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };