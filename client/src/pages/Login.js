import React, {useState} from 'react';
import {  loginUser,signupUser } from './../redux/actions/userActions';
import {Button, Box, Input} from '@material-ui/core';
import { connect } from 'react-redux';


const Login = ({loginUser, errorData}) =>{
console.log(errorData)
    const [state, setState]= useState({email:'',password:''})
    const {error} = errorData

  
    const inputChangeHandler  = e  => {
      setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }

  
  
    const submitHandler = (e) =>{
      e.preventDefault();
      loginUser(state)


    
    }
  
    return (
    <section className="auth-form">
    <form onSubmit ={(e) => submitHandler(e)}>
      {error ? error : null}
    <Box flexDirection="column" height="100%" width="50%" p={1} id="formInput" >
    <Box height="25%">
      <Input type="email" style = {{fontSize: 20}}  id="email" placeholder="Enter email"  onChange={inputChangeHandler} />
    </Box>

  <Box height="25%">
    <Input type="password" id="password" style = {{fontSize: 20}} placeholder="Password" onChange={inputChangeHandler} />
  </Box>
  <Button type="submit">
    Submit
  </Button>
  </Box>
</form>
    </section>
      
    );
  }
  const mapStateToProps = (state) => ({
    data: state.data,
    errorData: state.error
  });


export default connect(mapStateToProps, {signupUser,loginUser})(Login);
