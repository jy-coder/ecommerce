import React, { Component } from 'react'
import history from "./utils/history"
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import Nav from './components/Nav'
import SingleProd from './pages/SingleProd'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import {Login} from './pages/Login'




axios.defaults.baseURL =
  'http://127.0.0.1:1337/api';

class App extends Component {
  render() {
    return (
 
        <Provider store={store}>
          <Router history={history}>
            <Nav />
            <div className="container">
              <Switch>
                <Route exact path="/shop" component={Shop} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/product/:id" component={SingleProd} />
                <Route exact path="/cart" component={Cart} />
              </Switch>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App