import React, {useState} from 'react';
import {Button, Box, Input} from '@material-ui/core';


export const Login = () =>{
    const [state, setState]= useState({email:'',password:''})

  
    const inputChangeHandler  = e  => {
      setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }

  
  
    const submitHandler = (e) =>{
      console.log(state)
      e.preventDefault();


    
    }
  
    return (
    <section className="auth-form">
    <form onSubmit ={(e) => submitHandler(e)}>
    <Box flexDirection="column" height="100%" width="50%" p={1} id="formInput" >
    <Box height="25%">
      <Input type="email" style = {{fontSize: 20}}  id="email" placeholder="Enter email" h={300} onChange={inputChangeHandler} />
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

