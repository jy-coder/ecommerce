import React, { useState, useEffect } from 'react';
import { getReviewPermission, addReview} from './../redux/actions/reviewActions'
import { connect } from 'react-redux';
import EditReviewBtn from './../components/EditReviewBtn'
import {Grid,Typography, Button, TextField} from '@material-ui/core';
import {Rating} from '@material-ui/lab';
import store from './../redux/store'
import { CLEAR_PERMISSION } from './../redux/types';

function ReviewInput({productId, review, addReview,getReviewPermission}) {

    
    const [state, setState]= useState({text:'',rating:0, prodId: productId})

    useEffect(() => {
        getReviewPermission(productId)

      },[getReviewPermission,productId]);


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
        store.dispatch({type:CLEAR_PERMISSION})
        addReview(state)
    
      }


      const renderForm = () =>{
        let form

        if(review.mode === "add"){
          form  = (
            <Grid style={{marginTop:'5px', width:'80%',position:'relative'}}>
              <form onSubmit = {(e)=> submitHandler(e)}>
            <Typography variant="caption" component="span" style={{position:'relative', bottom:'5px'}}>
              Your Rating:
              </Typography>
              <Rating name="rating" onChange={ratingChangeHandler} min={1} max={5}/>
              
              
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
              <Grid item container>
                <Button type="submit" variant="outlined" color="primary" fullWidth>Add review</Button>
              </Grid>
              </form>
            </Grid>
         )}
     
         else if(review.mode === "edit"){
           form = (
            <EditReviewBtn prodId={productId}/>
     
         )
     
       }
       else
        return null

      return form
    }


    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            {renderForm()}
        </div>
    )
}


const mapStateToProps = (state) => ({
    data: state.data,
    user:state.user,
    review: state.review
  });

export default connect(mapStateToProps, {getReviewPermission,addReview})(ReviewInput);

