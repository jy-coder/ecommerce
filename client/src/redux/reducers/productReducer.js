import {
    SET_PRODUCTS,
    LOADING_PRODUCTS,
    LOADING_PRODUCT,
    SET_PRODUCT,
    INCREASE_LIMIT,
    LOAD_MORE_PRODUCTS,
    SET_SORT_ORDER,
    SET_CATEGORIES,
    SET_CATEGORY_OPT,
    SET_SUBCATEGORY_OPT,
  

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
    subsubcategory:[],
    myProductPage : 0,
    maxLimit : 0
 
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
          loading: false,
          myProductPage : action.count,
          maxLimit: action.totalCount
        };
      case SET_PRODUCT:
        return {
          ...state,
          product: action.payload,
          loading: false
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


      default:
        return state;
    }
  }