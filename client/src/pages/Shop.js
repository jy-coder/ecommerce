import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProducts } from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import {ProdCard} from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import {Card,CardActionArea, CardActions, CardContent,CardMedia,Button,Typography ,Grid } from '@material-ui/core';

 class Shop extends Component {

    componentDidMount(){
     
      this.props.getProducts()
        // console.log(this.props)
        
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
            <Wrapper>
         
              {this.renderProducts()}
           
            </Wrapper>
            
        )
    }
}



const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error
  });


export default connect(mapStateToProps, {getProducts})(Shop);
