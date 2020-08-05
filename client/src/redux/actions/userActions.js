import {
    SET_USER,
    SET_ERRORS,
    LOADING_UI,
    LOADING_USER,
    SET_UNAUTHENTICATED,
  } from '../types';
  import history from '../../utils/history'
  import axios from '../../utils/axios-handler';
  
  export const loginUser = ({ email, password }) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('user/login', { email, password })
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        history.push('/');
      })
      .catch((err) => {
        

      });
  };
  
  export const signupUser = ({ name, email, password, confirmPassword }) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('user/signup', { name, email, password, confirmPassword })
      .then((res) => {
        if(res)
          history.push('/login');
      })
      .catch((err) => {

      });
  };
  
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    history.push('/')
  };


  export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('user/getUser')
      .then((res) => {
        console.log(res)
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => {

      });
  };


  const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
  };