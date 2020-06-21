import React, {useEffect, useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar,Typography,Button,IconButton} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from './../redux/actions/userActions'



const useStyles = makeStyles((theme) => ({
  container:{
    width:"100%"
  },
  root: {
    flexGrow: 1,
    width:'100%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Nav({user,logoutUser}) {
  const {authenticated} = user
  const classes = useStyles();
  // useEffect(() => {

  // },[isAuth]);
  let routes
  
    if(authenticated){
     routes = (
    <Fragment>
      <Typography variant="h6" className={classes.title}>
        <Button color="inherit" href="/">Shop</Button>
        <Button color="inherit" href="/addproduct">Add</Button>
      </Typography>
      <Button color="inherit" href="/orderhistory">Orders</Button>
      <Button color="inherit" href="/cart">Cart</Button>
      <Button color="inherit"onClick={() => logoutUser()}>Logout</Button>
    </Fragment>
    )}

    else{
      routes = (
      <Fragment>
        <Typography className={classes.title}>
        <Button color="inherit" href="/">Shop</Button>
        </Typography>
        <Button color="inherit" href="/login">Login</Button>
        <Button color="inherit" href="/signup">Register</Button>
      </Fragment>

    )

  }



  return (
    <div className={classes.root}>
      <AppBar position="relative">
        <Toolbar>
         {routes}
        </Toolbar>
      </AppBar>
    </div>
  );
}



const mapStateToProps = (state) => ({
  data: state.data,
  cartData: state.cartData,
  orderData: state.orderData,
  user : state.user
});


export default connect(mapStateToProps,{logoutUser})(Nav);