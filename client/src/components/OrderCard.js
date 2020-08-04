import React,{useEffect, useState,useRef} from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import { connect } from 'react-redux';




const OrderCard = ({item}) => {
  
    return (
  
        <Grid container spacing={4}>
          <Grid item xs={3}>
              <img className='order-modal-img' src={`https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/${item.imageUrl}`} style={{height:'50px', width:'50px'}}/>
          </Grid>
          <Grid item xs={9} container>
            <Grid item xs container direction="row">
                <Grid item xs={12}>
                  <Typography variant="subtitle1" >
                    {item.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} container  >
                    <Grid item xs={6}>
                        <Typography variant="caption">
                          Qty:{item.quantity} 
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption">
                          Price:${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>

              </Grid>
              </Grid>

          </Grid>
    
   
 
  );
}




export default OrderCard;