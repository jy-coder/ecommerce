import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';


export const Spin = () => {

  return (
   
      <CircularProgress style={{minHeight:'100vh', display:'flex', justifyContent:'center',alignItems:'center'}}/>
    
  );
}
