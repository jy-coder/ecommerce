import React, {useEffect,useState} from 'react'
import { getCart } from './../redux/actions/cartActions'
import { connect } from 'react-redux';
import { Spin } from './../components/Spin';
import ItemCard from './../components/ItemCard';
import { Button} from '@material-ui/core';
import OrderModal from './../components/OrderModal';

const Cart = ({getCart,cartData}) => {

    useEffect(() => {
        getCart()
      },[getCart]);

    //   const { title,price,cartItem } = this.props.cartData;
    const { cartItems, loading} = cartData;
    let cartItemLoading = !loading ? (
        cartItems.map((item) => <ItemCard key={item.id} item={item} />)
      ) : (
        <Spin />
      );
    return (
        <div>
            {cartItemLoading}
            <OrderModal />
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData: state.orderData
  });


export default connect(mapStateToProps, {getCart})(Cart);
