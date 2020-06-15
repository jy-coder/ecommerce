import React,{useEffect} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle} from '@material-ui/core';
import { addToCart } from './../redux/actions/cartActions'
import { connect } from 'react-redux';
import { Spin } from './Spin';

const Msg = ({addToCart, prodId, cartData}) => {
    const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
  
    addToCart(prodId)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
    <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add To Cart
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {!cartData.loading ? cartData.message: <Spin/>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData
  });


export default connect(mapStateToProps, {addToCart})(Msg);

