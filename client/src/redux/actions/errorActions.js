import {
    SET_ERRORS,
}from '../types';


export const setError = (error,code) =>(dispatch) =>{
    dispatch({ type: SET_ERRORS, payload: error, code:code});
}