import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux';
import { getProducts, loadMoreProducts, getCategories,setCategoryOpt} from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import ProdCard from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import SelectBox from '../components/SelectBox'
import {Card,CardActionArea, CardActions, CardContent,CardMedia,Button,Typography ,Box } from '@material-ui/core';
import './Shop.css'


 class Shop extends Component {

    componentDidMount(){
     
      this.props.getProducts(this.props.data.limit,'',this.props.data.sortBy,this.props.data.orderBy)
      this.props.getCategories()
      // console.log(this.props)
        
    }

    componentDidUpdate(prevProps) {
      if(this.props.data.limit !== prevProps.data.limit) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      {
        // console.log(this.props.data.categoryId)
        this.props.getProducts(this.props.data.limit,'',this.props.data.sortBy,this.props.data.orderBy,this.props.data.categoryId)
      }
    } 
    

  renderProducts (){
    const { products, loading } = this.props.data;


    let productLoading = !loading ? (
      products.map((prod) => <ProdCard key={prod.id} prod={prod} />)
    ) : <Spin />;
    return productLoading


  }

  handleClick (cat){
    this.props.getProducts(this.props.data.limit,'',
      this.props.data.sortBy,this.props.data.orderBy,cat.id)
      this.props.setCategoryOpt(cat.id)
      
  }

  renderCategories(){
    const { categories,loading } = this.props.data;

    let categoriesLoading = !loading ? (
      categories.map((cat) => <Box className='category-box' 
      onClick={(e) => this.handleClick(cat)} key={cat.id}>{cat.name}</Box >)
    ) : <Spin />;
    return categoriesLoading

  }


    render() {
        return (
          
          <div className='shop-product-section'>
            <div className='gallery'>
                  <div className='image-small-container'>
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/harry-cunningham-7qCeFo19r24-unsplash.jpg' />
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/alexandra-gorn-WF0LSThlRmw-unsplash.jpg' className='image-small-hidden'/>
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/bryan-papazov-P3LVrAYJX1c-unsplash.jpg' className='image-small-hidden'/>
    
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/marcus-loke-xXJ6utyoSw0-unsplash.jpg' className='image-small-hidden' />
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/janko-ferlic-oLctpwsuYBg-unsplash.jpg' className='image-small-hidden'/>
                      <img src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/stil-D4jRahaUaIc-unsplash.jpg' className='image-small-hidden'/>
                  </div>
              </div>
              {/* <div className='shop-gender'>
                <div>Female</div>
                <div>Male</div>
              </div> */}
              <div className='shop-categories'>
                <div className='category-box' onClick={()=> this.props.getProducts(this.props.data.limit,'',this.props.data.sortBy,this.props.data.orderBy)}>All</div>
                {this.renderCategories()}
              </div>


              <div className='shop-select-option-box' style={{position:'relative',top:'10px'}}>
                <SelectBox />
              </div>
                <Wrapper>
                    {this.renderProducts()}  
                </Wrapper>
                  <hr/>
                <div className='shop-loadmore-btn'>
                  <Button onClick={(e) =>this.props.loadMoreProducts() } variant="outlined"  color="default">LOAD MORE</Button>
                </div>

              </div>
           

          
            
        )
    }
}



const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error
  });


export default connect(mapStateToProps, {getProducts,loadMoreProducts,getCategories,setCategoryOpt})(Shop);
