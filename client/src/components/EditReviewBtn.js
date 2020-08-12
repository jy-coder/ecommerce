import React,{useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle, Box, Input, TextField,NativeSelect} from '@material-ui/core';
import { connect } from 'react-redux';
import {getReviewEdit, updateReview} from './../redux/actions/reviewActions'
import history from '../utils/history';

 function EditReviewBtn({prodId,getReviewEdit,review,updateReview}) {
  const [open, setOpen] = React.useState(false);
  const [state,setState] = React.useState({text:''});
  const {productInfo} = review

  

  useEffect(() => {
    getReviewEdit(prodId)
  },[prodId]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChangeHandler  = e  => {
    setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }


const submitHandler  = e  => {
    e.preventDefault()
  
    if(state.text){
        updateReview(prodId , state.text)
        setTimeout(() => {
            handleClose()
            history.go(0)
            }, 1000);
    }
  
  
  }

  return (
    <div style={{width:'100%'}}>
    <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Edit review
    </Button>
 
      <Dialog
        open={open}
        onClose={handleClose}
      >
        
        <DialogContent>
          <Box>
            <TextField rows={5} variant="outlined" multiline id="text" onChange={inputChangeHandler} placeholder={productInfo.text} label="Update your review" fullWidth required/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" onClick={(e) => submitHandler(e)}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}


const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    review: state.review
  });


export default connect(mapStateToProps, {getReviewEdit, updateReview})(EditReviewBtn);