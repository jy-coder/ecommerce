import React, { useState, useEffect } from 'react';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import { connect } from 'react-redux';
import { Spin } from './../components/Spin'
import { Msg } from './../components/Msg'
import { getProduct} from './../redux/actions/productActions'




const SingleProd = ({getProduct,loading, data, match}) => {
   
    useEffect(() => {
        getProduct(match.params.id)
      },[getProduct]);

    const {product} = data
    return (
        <div >
        {!loading ? <Paper>
          <Grid container spacing={2}>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                  {product.description}
                  </Typography>
                    <input type="number"/>
                </Grid>
                <Grid item>

                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{product.price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>: <Spin/>}
      </div>
    );
  }


  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  
  export default connect(mapStateToProps, {getProduct})(SingleProd);
