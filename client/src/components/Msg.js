import React,{useEffect} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle,makeStyles} from '@material-ui/core';
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
    <Button variant="outlined"  onClick={handleClickOpen}>
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
            {!cartData.loading ? cartData.message: null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >
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

