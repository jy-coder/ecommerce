import React,{useState} from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Button, Box, TextField} from '@material-ui/core';
import{ confirmOrder} from './../redux/actions/orderActions'
import{ makePayment } from './../redux/actions/paymentActions'
import { connect } from 'react-redux';
import { PAYMENT_SUCCESS } from "../redux/types";


const CheckoutForm = ({ orderData, makePayment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const {totalPrice} = orderData
    const [state, setState]= useState({email:'',name:'',price:0})
  
  
  
    const handleSubmit = async event => {
        event.preventDefault()
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
      });

      console.log(error, paymentMethod)
  
      if (!error) {
        const { id } = paymentMethod;
        makePayment(id, totalPrice)
      }
    }
     

    const inputChangeHandler  = e  => {
        setState({
          ...state, 
          [e.target.id]: e.target.value
        });
      }
  
    return (
    <div>
      <form onSubmit={handleSubmit}>
      <Box flexDirection="column" height="100%" width="50%" p={1} id="formInput" >
        <Box>
            <TextField type="email" required  id="email"  onChange={inputChangeHandler} label='Email' fullWidth/>
        </Box>

        <Box>
            <TextField   id="name" required onChange={inputChangeHandler}  label='Name' fullWidth/>
        </Box>

        
        
        <Box style={{top: '30px', borderBottom: '2px grey solid', position:'relative'}}><CardElement/></Box>
        <Box style={{top: '30px',  position:'relative'}}>Total Payment: {totalPrice}</Box>
        
        <Box style={{top: '30px',  position:'relative'}}>
            <Button type="submit" disabled={!stripe} onClick={handleSubmit}>Pay</Button>
        </Box>
    </Box>
      </form>
    </div>
    );
  };

  const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData,
    payment: state.payment
  });

  
export default connect(mapStateToProps,{confirmOrder,makePayment})(CheckoutForm)
