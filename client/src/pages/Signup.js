import React, {useState} from 'react';
import {connect} from 'react-redux'
import {Button, Box} from '@material-ui/core';
import {  loginUser,signupUser } from './../redux/actions/userActions';


const Signup = ({signupUser,errorData}) =>{
    const [state, setState]= useState({email:'',name:'',password:'',confirmPassword:''})
    const {error} = errorData

  
    const inputChangeHandler  = e  => {
      setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }

  
  
    const submitHandler = (e) =>{
      e.preventDefault();
      signupUser(state)
   
    }
  
    return (
    <section className="auth-form">
    <form onSubmit ={(e) => submitHandler(e)}>
    {error.message ? error.message : null}
    <Box flexDirection="column" p={1}>
    <Box controlId="email">
      <input type="email" style = {{fontSize: 20}} placeholder="Enter email" id="email" onChange={inputChangeHandler} />
    </Box>

    <Box controlId="name">
      <input type="text" style = {{fontSize: 20}} placeholder="Enter name" id="name" onChange={inputChangeHandler} />
    </Box>

  <Box controlId="password">
    <input type="password" style = {{fontSize: 20}} placeholder="Password" id="password" onChange={inputChangeHandler} />
  </Box>


  <Box controlId="confirmPassword">
      <input type="password" style = {{fontSize: 20}} placeholder="Confirm password" id="confirmPassword" onChange={inputChangeHandler} />
    </Box>

  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Box>
</form>
    </section>
      
    );
  }

  const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData: state.orderData,
    errorData: state.error
  });


  export default connect(mapStateToProps, {signupUser,loginUser})(Signup);