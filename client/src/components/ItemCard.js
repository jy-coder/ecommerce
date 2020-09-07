import React,{useEffect,useRef} from 'react'
import {Grid, Paper, Typography, Button,  Avatar} from '@material-ui/core';
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

  if(checkRef.current.checked === true){
    updateItemQuantity(item.cartItem.productId,quantityRef.current.value)
  }


}






    return (
        <div >
      <Paper >
        <Grid container item xs={12}>
          <Grid item xs>
            <input type="checkbox" id={item.cartItem.productId} onChange={handleChange} ref={checkRef}/>
          </Grid>

          <Grid container item spacing={2} xs={11}>
            <Grid item xs={3} >
                <Avatar variant="square" style={{height:"100px", width:"100px"}}/>
            </Grid>
            <Grid item xs={7} container >
                <Grid item xs={8}>
                  <Typography variant="subtitle1">
                      <span ref={nameRef} id={`${item.title}-${item.cartItem.productId}`}>{item.title}</span>
                    </Typography>
                  <Typography gutterBottom  variant="subtitle1">
                      <input type="number" defaultValue={item.cartItem.quantity} ref={quantityRef} onChange={(e) => updateQuantity(e)}/>
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    <Button variant="outlined" color="secondary"
                    onClick={() =>removeFromCart(item.cartItem.productId) }>Remove</Button>
                  </Typography>
                </Grid>
                <Grid item container xs={4} direction='row' >
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

