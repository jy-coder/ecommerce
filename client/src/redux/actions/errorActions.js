import {
    SET_ERRORS,
    CLEAR_ERRORS
}from '../types';


export const setError = (error) =>(dispatch) =>{
    dispatch({ type: SET_ERRORS, payload: error});
}