import React from "react";
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



// you should use env variables here to not commit this
// but it is a public key anyway, so not as sensitive
const stripePromise = loadStripe("pk_test_ESsbkBeGyyBXZIDneeiEoXGv00U6TfqHOR");

const Payment = ({confirmOrder, payment}) => {
  const {status} = payment
  console.log(status)

  if (status === "success") {
    return <div>Purchase success!</div>;
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