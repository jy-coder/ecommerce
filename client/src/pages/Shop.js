import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux';
import { getProducts, loadMoreProducts} from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import ProdCard from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import SelectBox from '../components/SelectBox'
import {Card,CardActionArea, CardActions, CardContent,CardMedia,Button,Typography ,Grid } from '@material-ui/core';
import './Shop.css'


 class Shop extends Component {

    componentDidMount(){
     
      this.props.getProducts(this.props.data.limit,'',this.props.data.sortBy,this.props.data.orderBy)
        // console.log(this.props)
        
    }

    componentDidUpdate(prevProps) {
      if(this.props.data.limit !== prevProps.data.limit) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      {
        // console.log(this.props.data.page)
        this.props.getProducts(this.props.data.limit,'',this.props.data.sortBy,this.props.data.orderBy)
      }
    } 
    

  renderProducts (){
    const { products, loading } = this.props.data;


    let productLoading = !loading ? (
      products.map((prod) => <ProdCard key={prod.id} prod={prod} />)
    ) : <Spin />;
    return productLoading


  }


    render() {
    
        return (
          
            <div className='shop-product-section'>
            <Grid container  direction="row"  >
                <Grid item container lg={7} style={{overflow:'hidden'}}>
                  <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/freestocks-_3Q3tsJ01nc-unsplash.jpg' className='image-big'/>
                </Grid>
                <Grid item container lg={5} direction="row" style={{overflow:'hidden'}}>
                  <Grid item lg={4} style={{flexBasis:0}}>
                    <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/harry-cunningham-7qCeFo19r24-unsplash.jpg' className='image-small'/>
                  </Grid>
                    <Grid item lg={4} style={{flexBasis:0}}>
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/alexandra-gorn-WF0LSThlRmw-unsplash.jpg' className='image-small'/>
                    </Grid>
                    <Grid item lg={4} style={{flexBasis:0}}>
                    <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/bryan-papazov-P3LVrAYJX1c-unsplash.jpg' className='image-small'/>
                    </Grid>
                    <Grid item lg={4} style={{flexBasis:0}}>
                    <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/marcus-loke-xXJ6utyoSw0-unsplash.jpg' className='image-small'/>
                  </Grid>
                    <Grid item lg={4} style={{flexBasis:0}}>
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/janko-ferlic-oLctpwsuYBg-unsplash.jpg' className='image-small'/>
                    </Grid>
                    <Grid item lg={4} style={{flexBasis:0}}>
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/stil-D4jRahaUaIc-unsplash.jpg' className='image-small'/>
                    </Grid>
                  </Grid>
                  
                </Grid>
              <div className='shop-select-option-box'>
                <SelectBox/>
              </div>
              <hr/>
              <Wrapper>
                {this.renderProducts()}
              </Wrapper>
              <div className='shop-loadmore-btn'>
                <Button onClick={(e) =>this.props.loadMoreProducts() }>LOAD MORE</Button>
              </div>
          </div>

          
            
        )
    }
}



const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error
  });


export default connect(mapStateToProps, {getProducts,loadMoreProducts})(Shop);
