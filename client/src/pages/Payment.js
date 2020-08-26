import React, {useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements
} from "@stripe/react-stripe-js";
import {Button, Typography} from '@material-ui/core';
import{ confirmOrder} from './../redux/actions/orderActions'
import { connect } from 'react-redux';
import CheckoutForm from './../pages/CheckoutForm'
import OrderCard from './../components/OrderCard'
import {Spin} from './../components/Spin'
import history from './../utils/history'



// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe("pk_test_ESsbkBeGyyBXZIDneeiEoXGv00U6TfqHOR");

const Payment = ({payment,orderData}) => {
  const {status,orderNum,loading} = payment
  const {orders} = orderData


  useEffect(() => {

  },[status, orders, loading]);


  const renderOrders = () =>{
    let displayOrder;
    if(orders){
      displayOrder = orders.map((order,index) => <OrderCard key={index} item={order} />)
  
    }
    return displayOrder
  
  
  }

  if(loading){
    return(
      <Spin/>
    )
  }

  if (status === "success") {
    return(
    <div style={{top:'10px', position:'relative', width:'100%', height:'100%'}}>
      <div style={{position:'relative', width:'100%', height:'100%'}}>
        <Typography component="div" variant="h6">Purchase success!
        <Button onClick={()=> history.push('/')} variant="contained">Back to home</Button></Typography>
        <div>OrderNo:{orderNum.orderId}</div>
        <div>{renderOrders()}</div>
      </div>
  </div>
    )
  }


 

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
  );
};




const mapStateToProps = (state) => ({
  data: state.data,
  cartData: state.cartData,
  orderData:state.orderData,
  payment: state.payment
});


export default connect(mapStateToProps,{confirmOrder})(Payment)