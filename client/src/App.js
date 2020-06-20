import React, { Component } from 'react'
// import history from "./utils/history"
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
// import store from './redux/store';
import axios from 'axios';
import Nav from './components/Nav'
import SingleProd from './pages/SingleProd'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Signup from './pages/Signup'
import jwtDecode from 'jwt-decode';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { SET_AUTHENTICATED } from './redux/types';
import {connect} from 'react-redux'
import AddProd from './pages/AddProd'
import store from './redux/store';




axios.defaults.baseURL =
  'http://127.0.0.1:1337/api';





  const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    const {authenticated} = this.props
    let routes;
    if(authenticated){
      routes = (
     <Switch>
          <Route exact path="/" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/addproduct" component={AddProd} />
          <Route exact path="/product/:id" component={SingleProd} />
          <Redirect to="/" />
     </Switch>
     )}
 
     else{
       routes = (
       <Switch>
            <Route exact path="/" component={Shop} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/product/:id" component={SingleProd} />
            <Redirect to="/" />
       </Switch>
 
     )
 
   }
    return (
 
        <div>
            <Nav />
            <div className="container">
              {routes}
            </div>
          </div>

    );
  }
}


const mapStateToProps = (state) => ({
  data: state.data,
  cartData: state.cartData,
  orderData: state.orderData,
  user : state.user
});
export default connect(mapStateToProps)(App);