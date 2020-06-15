import React,{useEffect, useState,useRef} from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import { connect } from 'react-redux';
import { removeFromCart } from './../redux/actions/cartActions'
import { addToOrder, removeFromOrder } from './../redux/actions/orderActions'


 const ItemCard = ({item, removeFromCart, addToOrder, removeFromOrder, orderData}) => {
  const quantityRef = useRef()
  const nameRef = useRef()
  const checkRef = useRef()

  useEffect(() => {
        
  },[item.cartItem]);


  const {orders} = orderData



  function checkExist(orders, prodId) {
    let check = orders.some(order => order.productId === prodId);
    console.log(check)
    return check
}
  
    const handleChange = (e) =>{
        if(e.target.checked ){
        let itemToAdd = {productId: item.cartItem.productId, title:item.title, quantity:quantityRef.current.value, price:item.price}
        addToOrder(itemToAdd)
        }

    else{ 
        removeFromOrder(item.cartItem.productId)
    }
}


const unChecked = (e) =>{
  removeFromOrder(item.cartItem.productId)
 checkRef.current.checked = false
  // checkRef.current.value.checked = false
}






    return (
    
        <div >
      <Paper >
      <input type="checkbox" id={item.cartItem.productId} onChange={handleChange} ref={checkRef}/>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase >
              <img alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
              <span ref={nameRef} id={`${item.title}-${item.cartItem.productId}`}>{item.title}</span>
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                <input type="number" defaultValue={item.cartItem.quantity} ref={quantityRef} onChange={(e) => unChecked(e)}/>
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={() =>removeFromCart(item.cartItem.productId) }>Remove</Button>
              </Grid>
            </Grid>
            <Grid item>
        <Typography variant="subtitle1">${item.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData
  });


export default connect(mapStateToProps, {removeFromCart, addToOrder,removeFromOrder})(ItemCard);

