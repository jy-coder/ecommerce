import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {Card,CardActionArea, CardActions, CardContent,Button,Typography ,Grid,Avatar } from '@material-ui/core';
import {deleteProduct} from './../redux/actions/productActions'
import {Rating}from '@material-ui/lab';



const ProdCard = (props) =>{
    const {
        prod: {
            title,
            price,
            id,
            user,
            ratingAvg,
            reviewCount
        },
        userId
      } = props;

      const renderUpdateProductBtn = () =>{
        if(userId === user.id){
          return(
            <div className='product-card-btn'>
              <Button variant="contained" href={`/updateproduct/${id}` }>Edit</Button>
              <Button variant="outlined" color="secondary" onClick={() => props.deleteProduct(id)}>Delete</Button>
            </div>
          )
        }
        else
          return null
      }
        
      


 
  return (
    <Grid item lg={4} md={4} sm={4} xs={12}>
      <Card variant="outlined" className='product-card'>
      <CardActionArea>
        <Avatar variant="square" style={{height:'300px', width:'100%'}}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/product/${id}`}>{title}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <Rating name="read-only" value={Math.round(ratingAvg * 10)/10} readOnly />({reviewCount})
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {renderUpdateProductBtn()}
      {/* <Msg prodId={id}/> */}
      </CardActions>
      </Card>
    </Grid>
  );
}



const mapStateToProps = (state) => ({
  data: state.data,
  cartData: state.cartData,
  orderData: state.orderData
});


export default connect(mapStateToProps, {deleteProduct})(ProdCard);

