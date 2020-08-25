import React,{useState} from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Button, Box, TextField, Typography} from '@material-ui/core';
import{ confirmOrder} from './../redux/actions/orderActions'
import{ makePayment } from './../redux/actions/paymentActions'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  container:{
    width:"95%",
    position:"relative",
    height:'100vh',
    display:"flex",
    justifyContent:"center",
    top: "30px"
  },
  boxes:{
    flexDirection:'column',
    width:'50%',
    height:'80%',
    border:'1px solid grey',
    padding: '30px'

  },
  card:{
    position:"relative",
    top: "30px",
    borderBottom: '0.5px solid black'

  },
  payment:{
    position:"relative",
    top: "60px"

  },
  btn:{
    display:"flex",
    justifyContent:"flex-end",
    position:"relative",
    top: "30px"

  }

}))


const CheckoutForm = ({ orderData, makePayment }) => {
  const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const {totalPrice,orders} = orderData
    const [state, setState]= useState({email:'',name:'',price:0})
    let list = []
  
    const getProdIdList = (orders, list) =>{
  
      orders.map(order => list.push(order.productId))
     
  
    }
  
    const handleSubmit = async event => {
      event.preventDefault()
      getProdIdList(orders,list)
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
      });

      console.log(error, paymentMethod)
  
      if (!error) {
        const { id } = paymentMethod;
        makePayment(id, totalPrice,orders,list)
      }
    }
     

    const inputChangeHandler  = e  => {
        setState({
          ...state, 
          [e.target.id]: e.target.value
        });
      }
  
    return (
      
    <div  className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.container}>
      <Box className={classes.boxes}>
      <Typography variant="h6" component="div">
          Payment
        </Typography>
        
        <Box>
            <TextField type="email" required  id="email"  onChange={inputChangeHandler} label='Email' fullWidth/>
        </Box>

        <Box>
            <TextField   id="name" required onChange={inputChangeHandler}  label='Name' fullWidth/>
        </Box>

        
        
        <Box className={classes.card}><CardElement options={{hidePostalCode: true}}/></Box>
        <Box className={classes.payment} fontWeight="fontWeightBold">Total Payment: {totalPrice}</Box>
        
        <Box className={classes.btn}>
            <Button type="submit" disabled={!stripe} onClick={handleSubmit}  variant="outlined">Pay</Button>
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
