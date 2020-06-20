import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer from './reducers/productReducer'
import cartReducer from './reducers/cartReducer'
import orderReducer from './reducers/orderReducer'
import userReducer from './reducers/userReducer'
import errorReducer from './reducers/errorReducer'
const initialState = {};

const middleware = [thunk];


const reducers = combineReducers({
    data: productReducer,
    cartData:cartReducer,
    orderData: orderReducer,
    user: userReducer,
    error: errorReducer

  
  });


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;