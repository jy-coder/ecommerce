import React, {useState} from 'react';
import {connect} from 'react-redux'
import {Button, Box,Input} from '@material-ui/core';
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
    <div className="form-wrapper">
    <form onSubmit ={(e) => submitHandler(e)}>
  
    <Box flexDirection="column" p={1}>
    <Box controlId="email">
      <Input type="email" style = {{fontSize: 20}} placeholder="Enter email" id="email" onChange={inputChangeHandler} />
    </Box>

    <Box controlId="name">
      <Input type="text" style = {{fontSize: 20}} placeholder="Enter name" id="name" onChange={inputChangeHandler} />
    </Box>

  <Box controlId="password">
    <Input type="password" style = {{fontSize: 20}} placeholder="Password" id="password" onChange={inputChangeHandler} />
  </Box>


  <Box controlId="confirmPassword">
    <Input type="password" style = {{fontSize: 20}} placeholder="Confirm password" id="confirmPassword" onChange={inputChangeHandler} />
    </Box>

  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Box>
</form>
    </div>
      
    );
  }

  const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData: state.orderData,
    errorData: state.error
  });


  export default connect(mapStateToProps, {signupUser,loginUser})(Signup);