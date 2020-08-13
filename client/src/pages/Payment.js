import React, {useEffect} from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import {Button, Box, TextField} from '@material-ui/core';
import{ confirmOrder} from './../redux/actions/orderActions'
import { connect } from 'react-redux';
import CheckoutForm from './../pages/CheckoutForm'
import OrderCard from './../components/OrderCard'



// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe("pk_test_ESsbkBeGyyBXZIDneeiEoXGv00U6TfqHOR");

const Payment = ({payment,orderData}) => {
  const {status,orderNum} = payment
  const {orders} = orderData


  useEffect(() => {

  },[status === "success" && orders]);


  const renderOrders = () =>{
    let displayOrder;
    if(orders){
      displayOrder = orders.map((order,index) => <OrderCard key={index} item={order} />)
  
    }
    return displayOrder
  
  
  }



  if (status === "success") {
    return(
    <div>
      <div>Purchase success!</div>
      <div>OrderNo:{orderNum.orderId}</div>
      <div>{renderOrders()}</div>
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