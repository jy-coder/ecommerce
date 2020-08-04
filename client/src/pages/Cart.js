import React, {useEffect,useState,Fragment} from 'react'
import { getCart } from './../redux/actions/cartActions'
import { connect } from 'react-redux';
import { Spin } from './../components/Spin';
import ItemCard from './../components/ItemCard';
import { Button, Box, Grid} from '@material-ui/core';
import OrderModal from './../components/OrderModal';

const Cart = ({getCart,cartData, orderData}) => {

    useEffect(() => {
        getCart()
      },[getCart]);


      const renderCartItems = () =>{
        if(cartItems.length > 0){
         return cartItems.map((item) => <ItemCard key={item.id} item={item} />)
        }
        else{
          return <Box className='center-text'>Your cart is empty</Box>
        }
      }

     const renderOrderBtn = () => {
        if(orderData.orders.length > 0){
          return (
          <Box display='flex' justifyContent='center' style={{marginTop: '5px'}}>
            <OrderModal />
          </Box>
          )
        }
        else
          return null
     }

    //   const { title,price,cartItem } = this.props.cartData;
    const { cartItems, loading} = cartData;
 
    return (
      
        <div style={{marginTop: '10px'}}>
            {!loading ?
            <Fragment>
            {renderCartItems()}
            {renderOrderBtn()}
          </Fragment>:
            
            
            <Spin/>}
        
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData: state.orderData
  });


export default connect(mapStateToProps, {getCart})(Cart);
