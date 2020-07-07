import {
    SET_PRODUCTS,
    LOADING_PRODUCTS,
    LOADING_PRODUCT,
    DELETE_PRODUCT,
    POST_PRODUCT,
    SET_PRODUCT,
    ADD_REVIEW,
    EDIT_REVIEW,
    DELETE_REVIEW,
    CHECK_REVIEW

  } from '../types';



const initialState = {
    products: [],
    product: {},
    loading: false
  };




  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_PRODUCT:
      case LOADING_PRODUCTS:
        return {
          ...state,
          loading: true
        };

      case SET_PRODUCTS:
        return {
          ...state,
          products: action.payload,
          loading: false
        };
      case SET_PRODUCT:
        return {
          ...state,
          product: action.payload,
          loading: false
        };

      case ADD_REVIEW:
        return {
          ...state,
          product: {...state.product, reviews:[action.payload,...state.product.reviews]}
        };

        // case POST_PRODUCT:
        // case DELETE_PRODUCT:
        //   return{
        //     loading: false
        //   }
          


      // case DELETE_PRODUCT:
      //   index = state.products.findIndex(
      //     (product) => product.productId === action.payload
      //   );
      //   state.products.splice(index, 1);
      //   return {
      //     ...state
      //   };
      // case POST_PRODUCT:
      //   return {
      //     ...state,
      //     products: [action.payload, ...state.products]
      //   };

      default:
        return state;
    }
  }