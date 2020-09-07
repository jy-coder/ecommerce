import React,{useEffect,Fragment} from 'react'
import { connect } from 'react-redux';
import { getProducts } from './../redux/actions/productActions'
import ProdCard from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import SelectBox from '../components/SelectBox'
import Main from '../components/Main'
import LoadMore from '../components/LoadMore'
import {Spin} from '../components/Spin'



function SearchResult({getProducts,match,data}) {
    let search = match.params.searchQ



    useEffect(() => {
      if(match.params.searchQ.startsWith("CATEGORYNAME")){
        search = search.split("CATEGORYNAME")[1]
        getProducts('','',
          data.sortBy,data.orderBy,search)
       
      }
      else
        getProducts('',match.params.searchQ,
          data.sortBy,data.orderBy)
        
    },[match.params.searchQ,data.sortBy,data.orderBy]);

    const renderProducts =() => {
      let productLoading ;
        const { products, loading } = data;
        if(!loading)
       productLoading = (
          products.map((prod) => <ProdCard key={prod.id} prod={prod} />)
        )
        else
          productLoading = (<Spin/>)
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
      <div>
        <Main item={renderItem} />
        <LoadMore/>
      </div>
    )
}



const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData:state.orderData
  });


export default connect(mapStateToProps,{getProducts})(SearchResult)
