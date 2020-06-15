import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProducts } from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import {ProdCard} from '../components/ProdCard'
import {Wrapper} from '../components/Wrapper'
import axios from 'axios'
const URL = 'http://127.0.0.1:1337/api/shop/'
 class Shop extends Component {

    componentDidMount(){
     
      this.props.getProducts()
        // console.log(this.props)
        
    }


    render() {
      const { products, loading } = this.props.data;
      let productLoading = !loading ? (
        products.map((prod) => <ProdCard key={prod.id} prod={prod} />)
      ) : (
        <Spin />
      );
        return (
            <Wrapper>
            {productLoading}
            </Wrapper>
        )
    }
}



const mapStateToProps = (state) => ({
    data: state.data
  });


export default connect(mapStateToProps, {getProducts})(Shop);
