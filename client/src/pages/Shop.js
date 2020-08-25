import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProducts, loadMoreProducts, getCategories,setCategoryOpt} from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import ProdCard from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import SelectBox from '../components/SelectBox'

import './Shop.css'
import Main from '../components/Main'
import LoadMore from '../components/LoadMore'


 class Shop extends Component {


  componentDidMount(){
     
    this.props.getProducts(this.props.data.limit,'',this.props.data.sortBy,this.props.data.orderBy)
      
  }

  componentDidUpdate(prevProps) {
    if(this.props.data.limit !== prevProps.data.limit)
    {
      
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




 

    render() {
   

      const renderItem = (
        <div className='shop-product-section'>
        <div className='gallery'>
              <div className='image-small-container'>
                  <img alt= "" src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/harry-cunningham-7qCeFo19r24-unsplash.jpg' />
                  <img  alt= "" src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/bryan-papazov-P3LVrAYJX1c-unsplash.jpg' className='image-small-hidden'/>
    
                  <img alt= "" src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/marcus-loke-xXJ6utyoSw0-unsplash.jpg' className='image-small-hidden' />
                  <img  alt= "" src='https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/janko-ferlic-oLctpwsuYBg-unsplash.jpg' className='image-small-hidden image-medium-hidden'/>
            
              </div>
          </div>
    
    
          <div className='shop-select-option-box' style={{position:'relative',top:'10px'}}>
            <SelectBox />
          </div>
            <Wrapper>
                {this.renderProducts()}  
            </Wrapper>
        
            <LoadMore/>
      </div>
      )


    
        return (
          
              <Main item={renderItem}/>
            
        )
    }
}



const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error
  });


export default connect(mapStateToProps, {getProducts,loadMoreProducts,getCategories,setCategoryOpt})(Shop);
