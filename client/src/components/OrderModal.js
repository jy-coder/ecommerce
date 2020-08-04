import React,{useEffect} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle,Box,Grid} from '@material-ui/core';
import { connect } from 'react-redux';
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

const renderSum = () => {
  let sum = 0;
  orders.map((order) => {sum += order.price * order.quantity})
  return sum.toFixed(2)

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
    orderData:state.orderData
  });


export default connect(mapStateToProps,{confirmOrder})(OrderModal);

