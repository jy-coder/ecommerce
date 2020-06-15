import React,{useEffect} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle} from '@material-ui/core';
import { connect } from 'react-redux';
import { Spin } from './Spin';
import OrderCard from './OrderCard'
import{ confirmOrder} from './../redux/actions/orderActions'

const OrderModal = ({orderData, confirmOrder}) => {
    const [open, setOpen] = React.useState(false);
    const {orders} = orderData;
    const list = []


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (e) => {
      confirmOrder(orders,list)
  };


  const getProdIdList = (orders, list) =>{
    orders.map(order => list.push(order.productId))

  }



  getProdIdList(orders,list)

  let displayOrder = orders ? (
    orders.map((order,index) => <OrderCard key={index} item={order} />)
  ) : (
    null
  );
    let sum = 0
  orders.map((order) => {sum += order.price * order.quantity})
  return (
    <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Place Order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          
             {displayOrder}
         
        </DialogContent>
        <DialogActions>
            Total: {sum}
          <Button onClick={(e) => handleConfirm(e)} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData
  });


export default connect(mapStateToProps,{confirmOrder})(OrderModal);

