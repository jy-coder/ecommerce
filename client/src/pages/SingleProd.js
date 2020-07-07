import React, { useState, useEffect, useRef } from 'react';
import {Grid, Paper, Typography, Button, Divider, TextField, makeStyles,Box} from '@material-ui/core';
import { connect } from 'react-redux';
import { Spin } from './../components/Spin'
import  Msg  from './../components/Msg'
import ReviewCard from './../components/ReviewCard'
import { getProduct, addReview} from './../redux/actions/productActions'
import { getReviewPermission} from './../redux/actions/reviewActions'
import {Rating} from '@material-ui/lab';
import Wrapper from './../components/Wrapper'
import store from './../redux/store'
import {CLEAR_PERMISSION} from './../redux/types'





const SingleProd = ({getProduct,loading, data, match, addReview,user,getReviewPermission,review}) => {

  const [state, setState]= useState({text:'',rating:0,prodId:match.params.id})
  const {product} = data

  

  
    useEffect(() => {
        getProduct(match.params.id)
        getReviewPermission(match.params.id)

      },[getProduct,review.mode]);

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
        store.dispatch({type:'CLEAR_PERMISSION'})
        addReview(state)
       

      
      }

      const renderAddToCart = () =>{
        return <Msg prodId={product.id}/>
      }

      const renderProduct =() =>(
        
        <Grid item xs={12} container style={{marginLeft:'15px'}}>
          <Grid item container direction="column" spacing={2} xs={12} sm={4} style={{marginRight:'15px'}}>
            <Grid item>
              <img src={`/${product.imageUrl}`} />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom variant="subtitle1">{product.title}</Typography>
              <Divider/>
              <Typography variant="body2" gutterBottom>{product.description}</Typography>
              <Typography variant="subtitle1">${product.price}</Typography>
              {renderAddToCart()}
          </Grid>
      </Grid>
      )
    




      const renderForm = () =>{
        let form
        // let checkReviewExist
        // if(product.reviews){
        //       checkReviewExist =product.reviews.some(r=> r.userId === user.id)
        // }

        if(review.mode === "add"){
          form  = (
            <Grid style={{marginTop:'5px'}}>
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
              <Grid item container style={{display:'flex',justifyContent:"flex-end"}}>
                <Box ><Button type="submit" variant="outlined" color="primary">Add review</Button></Box>
              </Grid>
              </form>
            </Grid>
         )}
     
         else if(review.mode === "edit"){
           form = (
            <Button type="submit" variant="outlined" color="primary">Edit review</Button>
     
         )
     
       }
       else
        return null

      return form
    }


      const renderReviews = () =>{
        if(product.reviews && product.reviews.length>0)
          return product.reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        else
          return <Box display='flex' justifyContent='center'>
            <Box>This product does not have review yet</Box>
          </Box>

      }




   
    return (
        <div >
        {!loading ? 
        <Wrapper>
          <Paper>
            <Grid container spacing={2} >
              {renderProduct()}
                <Grid item xs={12} style={{margin:'15px'}}>
                  <Typography variant="subtitle1">Review</Typography>
                  <Divider/>
                    {renderForm()}
                  </Grid>
                <Grid item xs={12} >
                  {renderReviews()}
                </Grid>
            </Grid> 
          </Paper>
        </Wrapper>
        : <Spin/>}
      </div>
    );
  }


  const mapStateToProps = (state) => ({
    data: state.data,
    user:state.user,
    review: state.review
  });
  
  
  export default connect(mapStateToProps, {getProduct,addReview,getReviewPermission})(SingleProd);
