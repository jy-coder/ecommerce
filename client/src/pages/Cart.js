import React, {useEffect,Fragment} from 'react'
import { getCart } from './../redux/actions/cartActions'
import { connect } from 'react-redux';
import { Spin } from './../components/Spin';
import ItemCard from './../components/ItemCard';
import { Box} from '@material-ui/core';
import OrderModal from './../components/OrderModal';
import Main from './../components/Main'

const Cart = ({getCart,cartData, orderData}) => {
  const { cartItems, loading} = cartData;

    useEffect(() => {
        getCart()
      },[getCart]);


      const renderCartItems = () =>{
        if(cartItems.length > 0){
         return cartItems.map((item) => <ItemCard key={item.id} item={item} />)
        }
        else{
          return <Box style={{minHeight:'70vh', display:'flex', justifyContent:'center',alignItems:'center'}}>Your cart is empty</Box>
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

    const renderItem = (
      <div style={{marginTop: '10px'}}>
      {!loading ?
        <Fragment>
        {renderCartItems()}
        {renderOrderBtn()}
        </Fragment>:
      <Spin/>}
  
  </div>
    )
    


 
    return (
      <Main item={renderItem}/>
       
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData: state.orderData
  });


export default connect(mapStateToProps, {getCart})(Cart);
