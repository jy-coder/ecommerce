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
    CHECK_REVIEW,
    INCREASE_LIMIT,
    LOAD_MORE_PRODUCTS,
    SET_SORT_ORDER,
    SET_CATEGORIES,
    SET_CATEGORY_OPT,
    SET_SUBCATEGORIES,
    SET_SUBCATEGORY_OPT

  } from '../types';



const initialState = {
    categories: [],
    products: [],
    product: {},
    loading: false,
    defaultLimit : 6,
    limit:6,
    sortBy:'reviewCount',
    orderBy:'asc',
    categoryId:0,
    subcategory:{},
    subsubcategory:[]
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

      case LOAD_MORE_PRODUCTS:
        return {
          ...state,
          products: [...state.products, ...action.payload]
        };


        case INCREASE_LIMIT:
          return {
            ...state,
            limit: state.limit + 6
          };

        case SET_SORT_ORDER:
          return {
            ...state,
            sortBy: action.sortBy,
            orderBy: action.orderBy
          };


          case SET_CATEGORIES:
            return {
              ...state,
              categories: action.payload,
              loading: false
            };
          
          case SET_CATEGORY_OPT:
            return{
              ...state,
              subcategory: state.categories.filter((cat) => cat.id === action.payload)[0],
              loading: false
            };

          case SET_SUBCATEGORY_OPT:
            return{
              ...state,
              subsubcategory: state.subcategory.subcategories.filter((subcat) => subcat.id === action.payload)[0],
              loading: false
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