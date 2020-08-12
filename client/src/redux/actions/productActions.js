import {
    SET_PRODUCTS,
    LOADING_PRODUCTS,
    DELETE_PRODUCT,
    POST_PRODUCT,
    SET_PRODUCT,
    LOADING_PRODUCT,
    UPDATE_PRODUCT,
    INCREASE_LIMIT,
    SET_SORT_ORDER,
    SET_CATEGORIES,
    SET_CATEGORY_OPT,
    SET_SUBCATEGORIES,
    SET_SUBCATEGORY_OPT

  } from '../types';
  import axios from '../../utils/axios-handler';
  import history from '../../utils/history';
  
  // Get all screams
  export const getProducts = (limit,search,sortBy,orderBy,categoryId) => (dispatch) => {
    let query = `?limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`;
  
    if(categoryId)
      query += `&category=${categoryId}`
    else if(search)
      query += `&search=${search}`

    dispatch({ type: LOADING_PRODUCTS });
    axios
      .get(`shop${query}`)
      .then((res) => {
        dispatch({
          type: SET_PRODUCTS,
          payload: res.data
        });
      })
      .catch((err) => {
        // dispatch({ type: SET_ERRORS,
        //   payload: err.response.data.message, code: err.response.status});

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



  export const deleteProduct = (productId,imageUrl) => (dispatch) => {
    // dispatch({ type: LOADING_PRODUCT });
    axios
      .delete(`admin/deleteproduct/${productId}`,{data: {oldImage: imageUrl}})
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



  export const loadMoreProducts = (limit) => (dispatch) => {
    dispatch({type: INCREASE_LIMIT});

  };

  export const setSortOrder = (sortBy , orderBy) => (dispatch) => {
    dispatch({
      type: SET_SORT_ORDER,
      sortBy: sortBy,
      orderBy: orderBy
    
    });

  };


  export const setCategoryOpt = (categoryId) => (dispatch) => {
    dispatch({
      type: SET_CATEGORY_OPT,
      payload:categoryId
    
    });

  };


  export const setSubcategoryOpt = (subcategoryId) => (dispatch) => {
    console.log(subcategoryId)
    dispatch({
      type: SET_SUBCATEGORY_OPT,
      payload:subcategoryId
    
    });

  };




  export const getCategories = () => (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    axios
      .get('shop/getCategories')
      .then((res) => {
        dispatch({
          type: SET_CATEGORIES,
          payload:res.data
        });
      })
      .catch((err) => {
        
      });
  };



  export const getSubcategories = (categoryId) => (dispatch) => {
    console.log('dispatch subcategories')
    axios
      .get(`shop/getSubcategories/${categoryId}`)
      .then((res) => {
        dispatch({
          type: SET_SUBCATEGORIES,
          payload:res.data
        });
      })
      .catch((err) => {
        
      });
  };


  export const getEditProduct = (productId) => (dispatch) => {
    dispatch({ type: LOADING_PRODUCT });
    axios
      .get(`admin/edit/${productId}`)
      .then((res) => {
        dispatch({ type: SET_PRODUCT, payload: res.data })
        
      })
      .catch((err) => {

      });
  };





  



  