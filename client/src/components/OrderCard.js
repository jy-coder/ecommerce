import React,{useEffect, useState,useRef} from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import { connect } from 'react-redux';
import { addToOrder} from './../redux/actions/orderActions'



const OrderCard = ({item}) => {
  
    useEffect(() => {
        
      },[]);


    return (
        
  
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase >
              <img alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
              {item.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                 Qty: {item.quantity}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                ${item.price * item.quantity}
                </Typography>
              </Grid>

            </Grid>
            <Grid item>
 
            </Grid>
          </Grid>
        </Grid>
   
 
  );
}


const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData
  });


export default connect(mapStateToProps)(OrderCard);