import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from './utils/axios-handler';
import SingleProd from './pages/SingleProd'
import UpdateProd from './pages/UpdateProd'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Signup from './pages/Signup'
import jwtDecode from 'jwt-decode';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { setError } from './redux/actions/errorActions';
import { SET_AUTHENTICATED,CLEAR_ERRORS } from './redux/types';
import {connect} from 'react-redux'
import AddProd from './pages/AddProd'
import SearchResult from './pages/SearchResult'
import store from './redux/store';
import ErrorBoundary from './components/ErrorBoundary'
import My404Page from './pages/My404Page'
import OrderHistory from './pages/OrderHistory'
import MyProduct from './pages/MyProduct'
import Payment from './pages/Payment'


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
    store.dispatch({ type: SET_AUTHENTICATED });
  }
}




axios.interceptors.request.use(req => {
  // const errorCode = store.getState().error.code
  // console.log(errorCode)
  store.dispatch({ type: CLEAR_ERRORS });
    
  return req;
});
axios.interceptors.response.use(res => res, error => {
  if(error.response){
    store.dispatch(setError(error.response.data.message,error.response.status));
    if(error.response.status === 401){
      store.dispatch(logoutUser())
    }
   
  }
  else
    store.dispatch(setError("Network error"))
});

class App extends Component {
  render() {
    const {authenticated} = this.props.user
    const {payment} = this.props.payment
    // console.log(payment)
    let routes;
    if(authenticated){
      routes = (
       <ErrorBoundary>
            <Switch>
            <Route exact path="/" component={Shop} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/product/:id" component={SingleProd} />
            <Route exact path="/updateproduct/:id" component={UpdateProd} />
            <Route exact path="/addproduct" component={AddProd} />
            <Route exact path="/orderhistory" component={OrderHistory} />
            <Route exact path="/manage" component={MyProduct} />
            <Route exact path="/search/:searchQ" component={SearchResult} />
            <Route exact path="/payment" component={Payment}/>
            {payment ? <Route exact path="/payment" component={Payment}/> : <Redirect to="/" />}
            <Route component={My404Page} />
            <Redirect to="/" />
          </Switch>
        </ErrorBoundary>
          
     
     )}
 
     else{
       routes = (
            
            <ErrorBoundary>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Shop} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/product/:id" component={SingleProd} />
                <Route exact path="/search/:searchQ" component={SearchResult} />
                <Route component={My404Page} />
              <Redirect to="/" />
              </Switch>
            </ErrorBoundary>
            
            
          
 
     )
 
   }
    return (
 
        <div style={{height:'100%'}}>
            {/* <Nav /> */}
            {routes}
          </div>

    );
  }
}


const mapStateToProps = (state) => ({
  data: state.data,
  cartData: state.cartData,
  orderData: state.orderData,
  error:state.error,
  user : state.user,
  payment: state.payment
});
export default connect(mapStateToProps)(App);