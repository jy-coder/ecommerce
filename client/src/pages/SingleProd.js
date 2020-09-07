import React, { useEffect } from 'react';
import {Grid, Paper, Typography,  Divider,Avatar,makeStyles} from '@material-ui/core';
import { connect } from 'react-redux';
import { Spin } from './../components/Spin'
import  Msg  from './../components/Msg'
import ReviewCard from './../components/ReviewCard'
import { getProduct} from './../redux/actions/productActions'
import Wrapper from './../components/Wrapper'
import Main from './../components/Main'
import ReviewInput from './../components/ReviewInput'

const useStyles = makeStyles((theme) => ({
 pic: {
  [theme.breakpoints.down("xs")]: {
    display: "none"
  },
  width: '200px',
  height: '200px'
  }
}))





const SingleProd = ({getProduct,loading, data, match, user}) => {
  const classes = useStyles();
  const {product} = data

    useEffect(() => {
        getProduct(match.params.id)
    
      },[getProduct,match.params.id]);

   


      const renderAddToCart = () =>{
        return <Msg prodId={product.id}/>
      }

      const renderProduct =() =>(
        
        <Grid item xs={12} container>
          <Grid item container direction="column" spacing={2} xs={12} sm={4} style={{marginRight:'auto'}}>
              <Avatar variant="square" className={classes.pic}/>
          </Grid>
          <Grid item xs={12} sm={7} style={{textAlign:'center'}}>
            <Typography gutterBottom variant="h5" className='single-product-typo'>{product.title}</Typography>
              <Divider/>
              <Typography variant="h5" className='single-product-typo'>${product.price}</Typography>
              <Typography variant="body2" gutterBottom className='single-product-typo'>{product.description}</Typography>
              {renderAddToCart()}
          </Grid>
      </Grid>
      )
  


      const renderReviews = () =>{
        if(product.reviews && product.reviews.length>0)
          return product.reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        else
          return <div className='center-text'>
           This product does not have review yet
          </div>

      }


      const renderRecommendation = () =>{
        return <div className='center-text'>
        -
       </div>
      }



      const renderItem = (
        <Wrapper>
        {!loading ? 
      
            <Grid container spacing={2} style={{width:'100%', height:'100%'}}>
              <Grid item xs={12} className='single-shop-product-section' >
                <Paper className='single-product-paper'>
                  {renderProduct()}
                </Paper>
                </Grid>
                <Grid item xs={12} className='single-product-reco'>
                  <Paper className='single-product-paper'>
                    <Typography variant="h5" className='single-product-typo'>Recommendation</Typography>
                    <Divider/>
                    {renderRecommendation()}
                  </Paper>
                </Grid>
  
                <Grid item xs={12} className='single-product-review' >
                  <Paper className='single-product-paper' >
                    <Typography className='single-product-typo' variant="h5" >Review</Typography>
                    <Divider/>
                      {user.authenticated ? <ReviewInput productId={match.params.id}/> : null}
                      <div>
                        {renderReviews()}
                      </div>
                    </Paper>
                  </Grid>
              
                  
           
          
            </Grid> 
        : <Spin/>}
      </Wrapper>
      )




   
    return (
      <Main item={renderItem}/>
    )
  }


  const mapStateToProps = (state) => ({
    data: state.data,
    user:state.user,
    review: state.review
  });
  
  
  export default connect(mapStateToProps, {getProduct})(SingleProd);
