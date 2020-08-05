import React, {useState} from 'react';
import {connect} from 'react-redux'
import {Button, Box,TextField} from '@material-ui/core';
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
    {error ? <span className="error-msg">** {error}</span> : null}
    <Box flexDirection="column" p={1}>
    <Box controlId="email">
      <TextField type="email" label="Email" id="email" onChange={inputChangeHandler} fullWidth required />
    </Box>

    <Box controlId="name">
      <TextField type="text" id="name" label="Name" onChange={inputChangeHandler} fullWidth required/>
    </Box>

  <Box controlId="password">
    <TextField type="password" id="password" label="Password" onChange={inputChangeHandler} fullWidth required/>
  </Box>


  <Box controlId="confirmPassword">
    <TextField type="password" id="confirmPassword" label="Confirm Password" onChange={inputChangeHandler} fullWidth required/>
  </Box>

  <Box display="flex" justifyContent="center" style={{marginTop: '10px'}}>
    <Button variant="outlined" type="submit">
      Submit
    </Button>
  </Box>
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