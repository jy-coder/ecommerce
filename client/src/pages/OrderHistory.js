import React, {useEffect} from 'react'
import { getOrders } from './../redux/actions/orderActions'
import { connect } from 'react-redux';
import { Spin } from './../components/Spin';
import OrderHistoryCard from './../components/OrderHistoryCard'
import Main from './../components/Main'
import Paginate from './../components/Paginate'


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
        <div>
            <Main item={renderItem} />
            <Paginate count={orderData.myProductPage} option={"order"}/>
        </div>
    )
}


const mapStateToProps = (state) => ({
    orderData: state.orderData
  });

export default connect(mapStateToProps, {getOrders})(OrderHistory);
