import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {Card,CardActionArea, CardActions, CardContent,CardMedia,Button,Typography ,Grid } from '@material-ui/core';
import Msg  from './../components/Msg'
import {deleteProduct} from './../redux/actions/productActions'
import {Rating}from '@material-ui/lab';



const ProdCard = (props,{deleteProduct}) =>{
    const {
        prod: {
            title,
            price,
            id,
            description,
            imageUrl,
            user,
            ratingAvg,
            reviewCount
        },
        userId
      } = props;

      const renderUpdateProductBtn = () =>{
        if(userId === user.id){
          return(
            <Fragment>
              <Button variant="contained" href={`/updateproduct/${id}` }>Edit</Button>
              <Button variant="outlined" color="secondary" onClick={() => props.deleteProduct(id,imageUrl)}>Delete</Button>
            </Fragment>
          )
        }
        else
          return null
      }
        
      


 
  return (
    <Grid item lg={3} md={3} sm={4} xs={12} className='product-card'>
      <Card variant="outlined">
      <CardActionArea>
        <img src = {`https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/${imageUrl}`} style={{width:'200px', height:'200px'}}/>
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

