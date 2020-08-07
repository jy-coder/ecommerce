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
import EditReviewBtn from './../components/EditReviewBtn'
import Main from './../components/Main'





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
        // console.log(product.id)
        return <Msg prodId={product.id}/>
      }

      const renderProduct =() =>(
        
        <Grid item xs={12} container>
          <Grid item container direction="column" spacing={2} xs={12} sm={4} style={{marginRight:'auto'}}>
              <img className='single-product-img' src={`https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/${product.imageUrl}`} style={{width: '200px', height:'200px'}}/>
          </Grid>
          <Grid item xs={12} sm={7} style={{textAlign:'center'}}>
            <Typography gutterBottom variant="h5" className='single-product-typo'>{product.title}</Typography>
              <Divider/>
              <Typography variant="h5" className='single-product-typo'>${product.price}</Typography>
              <Typography variant="body2" gutterBottom className='single-product-typo'>{product.description}</Typography>
              {renderAddToCart()}
          </Grid>
      </Grid>
      )
    




      const renderForm = () =>{
        let form

        if(review.mode === "add"){
          form  = (
            <Grid style={{marginTop:'5px'}}>
              <form onSubmit = {(e)=> submitHandler(e)}>
              Your Rating: <Rating onChange={ratingChangeHandler} required/>
              <TextField 
                id="text"
                label="Enter review"
                rows={3}
                placeholder="Enter review"
                multiline
                variant="outlined"
                fullWidth
                onChange={inputChangeHandler}
                required
              />
              <Grid item container style={{display:'flex',justifyContent:"flex-end"}}>
                <Button type="submit" variant="outlined" color="primary">Add review</Button>
              </Grid>
              </form>
            </Grid>
         )}
     
         else if(review.mode === "edit"){
           form = (
            <EditReviewBtn prodId={match.params.id}/>
     
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
          return <div className='center-text'>
           This product does not have review yet
          </div>

      }


      const renderRecommendation = () =>{
        return <div className='center-text'>
        -
       </div>
      }



      const renderItem = (
        <Wrapper>
        {!loading ? 
      
            <Grid container spacing={2} style={{width:'100%', height:'100%'}}>
              <Grid item xs={12} className='single-shop-product-section' >
                <Paper className='single-product-paper'>
                  {renderProduct()}
                </Paper>
                </Grid>
                <Grid item xs={12} className='single-product-reco'>
                  <Paper className='single-product-paper'>
                    <Typography variant="h5" className='single-product-typo'>Recommendation</Typography>
                    <Divider/>
                    {renderRecommendation()}
                  </Paper>
                </Grid>
  
                <Grid item xs={12} className='single-product-review'>
                  <Paper className='single-product-paper'>
                    <Typography className='single-product-typo' variant="h5">Review</Typography>
                    <Divider/>
                      {renderForm()}
                      {renderReviews()}
                    </Paper>
                  </Grid>
              
                  
           
          
            </Grid> 
        : <Spin/>}
      </Wrapper>
      )




   
    return (
      <Main item={renderItem}/>
    )
  }


  const mapStateToProps = (state) => ({
    data: state.data,
    user:state.user,
    review: state.review
  });
  
  
  export default connect(mapStateToProps, {getProduct,addReview,getReviewPermission})(SingleProd);
