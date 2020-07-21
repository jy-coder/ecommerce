import React,{useEffect, useState,useRef,Fragment} from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import { connect } from 'react-redux';
import { getProducts, loadMoreProducts } from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import ProdCard from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import SelectBox from '../components/SelectBox'



function SearchResult({getProducts,match,data}) {
    // console.log(match.params.searchQ)
    const search = match.params.searchQ


    useEffect(() => {
        getProducts(data.limit,match.params.searchQ)
        
    },[]);

    const renderProducts =() => {
        const { products, loading } = data;
    
    
        let productLoading = !loading ? (
          products.map((prod) => <ProdCard key={prod.id} prod={prod} />)
        ) : <Spin />;
        return productLoading
    
    
      }


    return (
        <Fragment>
            <div className='shop-product-section'>
              <div className='shop-select-option-box'>
                <SelectBox search={search}/>
              </div>
              <hr/>
              <Wrapper>
                {renderProducts()}
              </Wrapper>
              <div className='shop-loadmore-btn'>
                <Button onClick={(e) =>loadMoreProducts() }>LOAD MORE</Button>
              </div>
          </div>
          </Fragment>
    )
}



const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData
  });


export default connect(mapStateToProps,{getProducts})(SearchResult)
