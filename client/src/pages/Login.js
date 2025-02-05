import React, {useState} from 'react';
import {  loginUser,signupUser } from './../redux/actions/userActions';
import {Button, Box, TextField} from '@material-ui/core';
import { connect } from 'react-redux';
import Main from './../components/Main'

const Login = ({loginUser, errorData}) =>{
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

    const renderItem = (
    <div className="form-wrapper">
    <form onSubmit ={(e) => submitHandler(e)}>
      {error ? <span className="error-msg">** {error}</span> : null}
    <Box flexDirection="column" height="100%" width="50%" p={1} id="formInput" >
    <Box height="25%">
      <TextField type="email" required  id="email"  onChange={inputChangeHandler} label='Email' fullWidth/>
    </Box>

  <Box height="25%">
    <TextField  type="password" id="password" required onChange={inputChangeHandler}  label='Password' fullWidth/>
  </Box>
  <Box display="flex" justifyContent="center" style={{marginTop: '10px'}}>
    <Button type="submit" variant="outlined">
      Submit
    </Button>
  </Box>
  </Box>
</form>
    </div>
    )


  
    return (
      <Main item={renderItem} />
   
      
    );
  }
  const mapStateToProps = (state) => ({
    data: state.data,
    errorData: state.error
  });


export default connect(mapStateToProps, {signupUser,loginUser})(Login);
