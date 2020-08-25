import React from 'react'
import { getProducts, loadMoreProducts} from './../redux/actions/productActions'
import { connect } from 'react-redux';
import {Button,Box } from '@material-ui/core';

function LoadMore({data,loadMoreProducts }) {
    const loadMore = () => {
        if(data.limit < data.maxLimit){
          return(
          <Box display="flex" justifyContent="center">
              <Button onClick={(e) =>loadMoreProducts()} variant="outlined"  color="default">LOAD MORE</Button>
          </Box>
          )
        
        }
        else
          return null
    

      }



    return (
        <div>
           {loadMore()}
        </div>
    )
}


const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error
  });

export default connect(mapStateToProps, {getProducts,loadMoreProducts})(LoadMore);
