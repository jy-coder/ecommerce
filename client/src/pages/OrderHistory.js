import React, {useEffect,useState,Fragment} from 'react'
import { getOrders } from './../redux/actions/orderActions'
import { connect } from 'react-redux';
import { Spin } from './../components/Spin';
import { Button, Box, Grid} from '@material-ui/core';
import OrderHistoryCard from './../components/OrderHistoryCard'


function OrderHistory({orderData,getOrders}) {
  
    const {ordersHistory, loading } = orderData
 
    useEffect(() => {
        getOrders()
      },[getOrders]);


    const renderOrderItems = () =>{
    if(ordersHistory.length > 0){
        return ordersHistory.map((item) => <OrderHistoryCard key={item.id} item={item} />)
    }
    else{
        return "You have no orders yet"
    }
    }

    return (
        <div>
            {!loading? renderOrderItems() : <Spin/>}
        </div>
    )
}


const mapStateToProps = (state) => ({
    orderData: state.orderData
  });

export default connect(mapStateToProps, {getOrders})(OrderHistory);
