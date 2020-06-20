import React, { useState, useEffect, useRef } from 'react';
import {Grid, Paper, Typography, Button, Divider, TextField, makeStyles} from '@material-ui/core';
import { connect } from 'react-redux';
import { Spin } from './../components/Spin'
import  Msg  from './../components/Msg'
import ReviewCard from './../components/ReviewCard'
import { getProduct, addReview} from './../redux/actions/productActions'
import {Rating} from '@material-ui/lab';




const SingleProd = ({getProduct,loading, data, match, addReview,user}) => {

  const [state, setState]= useState({text:'',rating:0,prodId:match.params.id})
  const {product} = data
  let checkReviewExist
  if(product.reviews){
        checkReviewExist =product.reviews.some(r=> r.userId === user.id)
  }
  

  
    useEffect(() => {
        getProduct(match.params.id)
      },[getProduct]);

      const inputChangeHandler  = e  => {
        setState({
          ...state, 
          [e.target.id]: e.target.value
        });
      }


      const ratingChangeHandler  = e  => {
        setState({
          ...state, 
          rating: e.target.value
        });
      }


      const submitHandler = (e) =>{
        e.preventDefault();
        addReview(state)

      
      }


      let form
      if(!checkReviewExist){
        form  = (
          <form onSubmit = {(e)=> submitHandler(e)}>
          Your Rating: <Rating onChange={ratingChangeHandler}/>
          <TextField 
            id="text"
            label="Enter review"
            rows={3}
            placeholder="Enter review"
            multiline
            variant="outlined"
            fullWidth
            onChange={inputChangeHandler}
          />
          <Button type="submit">Add review</Button>
          </form>
       )}
   
       else{
         form = (
          <Button type="submit">Edit review</Button>
   
       )
   
     }



   
    return (
        <div >
        {!loading ? <Paper>
          <Grid container spacing={2} style={{border: "solid  2px black"}}>
            <Grid item xs={12} container>
              <Grid item container direction="column" spacing={2} xs={12} sm={4} >
                <Grid item>
                  <img src={`/${product.imageUrl}`} />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography gutterBottom variant="subtitle1">
                    {product.title}
                  </Typography>
                  <Divider/>
                <Typography variant="body2" gutterBottom>
                  {product.description}
                  </Typography>

             
                <Typography variant="subtitle1">${product.price}</Typography>
                <Msg prodId={product.id}/>
              </Grid>
            </Grid>
          </Grid>
        <Grid>
          <Typography variant="subtitle1">Review</Typography>
          <Divider/>
          {form}
          {product.reviews ? product.reviews.map((review) => <ReviewCard key={review.id} review={review} />) : null}
          
          </Grid>
        </Paper>: <Spin/>}
      </div>
    );
  }


  const mapStateToProps = (state) => ({
    data: state.data,
    user:state.user
  });
  
  
  export default connect(mapStateToProps, {getProduct,addReview})(SingleProd);
