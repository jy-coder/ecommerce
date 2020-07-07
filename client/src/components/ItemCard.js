import React,{useEffect, useState,useRef} from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import { connect } from 'react-redux';
import { removeFromCart } from './../redux/actions/cartActions'
import { addToOrder, removeFromOrder,updateItemQuantity } from './../redux/actions/orderActions'


 const ItemCard = ({item, removeFromCart, addToOrder, removeFromOrder, orderData,updateItemQuantity}) => {
  const quantityRef = useRef()
  const nameRef = useRef()
  const checkRef = useRef()

  useEffect(() => {
        
  },[item.cartItem]);



  
    const handleChange = (e) =>{
        if(e.target.checked ){
        let itemToAdd = {productId: item.cartItem.productId, title:item.title, quantity:quantityRef.current.value, price:item.price, imageUrl:item.imageUrl}
        addToOrder(itemToAdd)
        }

    else{ 
        removeFromOrder(item.cartItem.productId)
    }
}


const updateQuantity = (e) =>{
  // console.log(quantityRef.current.value)
  // console.log(item.cartItem.productId)
  if(checkRef.current.checked === true){
    updateItemQuantity(item.cartItem.productId,quantityRef.current.value)
  }

//   removeFromOrder(item.cartItem.productId)
//  checkRef.current.checked = false
  // checkRef.current.value.checked = false
}






    return (
        <div >
      <Paper >
        <Grid container item xs={12} sm container>
          <Grid container item xs >
            <input type="checkbox" id={item.cartItem.productId} onChange={handleChange} ref={checkRef}/>
          </Grid>

          <Grid container spacing={2} xs={11}>
            <Grid item xs={3}>
                <img src={`/${item.imageUrl}`} style={{height:'125px', width:'125px'}}/>
            </Grid>
            <Grid item xs={9} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                <span ref={nameRef} id={`${item.title}-${item.cartItem.productId}`}>{item.title}</span>
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                  <input type="number" defaultValue={item.cartItem.quantity} ref={quantityRef} onChange={(e) => updateQuantity(e)}/>
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


export default connect(mapStateToProps, {removeFromCart, addToOrder,removeFromOrder,updateItemQuantity})(ItemCard);

