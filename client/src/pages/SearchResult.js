import React,{useEffect, useState,useRef,Fragment} from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import { connect } from 'react-redux';
import { getProducts, loadMoreProducts } from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import ProdCard from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import SelectBox from '../components/SelectBox'
import Main from '../components/Main'



function SearchResult({getProducts,match,data}) {
    // console.log(match.params.searchQ)
    let search = match.params.searchQ



    useEffect(() => {
      if(match.params.searchQ.startsWith("CATEGORYNAME")){
        search = search.split("CATEGORYNAME")[1]
        getProducts(data.defaultLimit,'',
          data.sortBy,data.orderBy,search)
       
      }
      else
        getProducts(data.defaultLimit,match.params.searchQ,
          data.sortBy,data.orderBy)
        
    },[match.params.searchQ,data.sortBy,data.orderBy]);

    const renderProducts =() => {
        const { products, loading } = data;
        let productLoading = (
          products.map((prod) => <ProdCard key={prod.id} prod={prod} />)
        )
        return productLoading
    
    
      }

      const renderItem =(
        <Fragment>
        <div className='shop-product-section'>
          <div className='shop-select-option-box'>
            <SelectBox search={search}/>
          </div>
          <Wrapper>
            {renderProducts()}
          </Wrapper>
      </div>
      </Fragment>
      )


    return (
      <Main item={renderItem} />
    )
}



const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData
  });


export default connect(mapStateToProps,{getProducts})(SearchResult)
