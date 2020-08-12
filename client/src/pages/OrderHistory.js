import React, {useEffect,useState,Fragment} from 'react'
import { getOrders } from './../redux/actions/orderActions'
import { connect } from 'react-redux';
import { Spin } from './../components/Spin';
import { Button, Box, Grid} from '@material-ui/core';
import OrderHistoryCard from './../components/OrderHistoryCard'
import Main from './../components/Main'


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
        return <div style={{minHeight:'100vh', display:'flex', justifyContent:'center',alignItems:'center'}}>You have no orders yet</div>
    }
    }

    const renderItem = (
        <div>
            {!loading? renderOrderItems() : <Spin/>}
        </div>

    )
    

    return (
        <Main item={renderItem} />
    )
}


const mapStateToProps = (state) => ({
    orderData: state.orderData
  });

export default connect(mapStateToProps, {getOrders})(OrderHistory);
