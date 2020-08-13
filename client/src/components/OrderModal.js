import React,{useEffect} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle,Box,Grid} from '@material-ui/core';
import { connect } from 'react-redux';
import OrderCard from './OrderCard'
import{ confirmOrder, setPrice} from './../redux/actions/orderActions'
import{ setPayment } from './../redux/actions/paymentActions'
import history from '../utils/history';

const OrderModal = ({orderData,setPayment,setPrice}) => {
    const [open, setOpen] = React.useState(false);
    const {orders} = orderData;
    let list = []
    let sum = 0


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (e) => {
      setPrice(sum)
      setPayment()
      history.push('/payment')
  };


  const getProdIdList = (orders, list) =>{
    
    orders.map(order => list.push(order.productId))
   

  }

const renderSum = () => {
  orders.map((order) => {sum += order.price * order.quantity})
  sum = sum.toFixed(2)
  return sum

}


const renderOrders = () =>{
  getProdIdList(orders,list)
  let displayOrder;
  if(orders){
    displayOrder = orders.map((order,index) => <OrderCard key={index} item={order} />)

  }
  return displayOrder


}

  
  return (
    <div >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Place Order
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className='test'>
          
             {renderOrders()}
         
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={12} style={{'display':'flex','justifyContent':'center'}}>
              Total: ${renderSum()}
            </Grid>
            <Grid item xs={12} style={{'display':'flex','justifyContent':'flex-end'}}>
              <Button onClick={(e) => handleConfirm(e)} variant="outlined">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData,
    payment: state.payment
  });


export default connect(mapStateToProps,{confirmOrder, setPayment,setPrice})(OrderModal);

