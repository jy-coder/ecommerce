import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux';
import { getAdminProducts } from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import ProdCard from '../components/ProdCard'
import Wrapper from '../components/Wrapper'
import {Card,CardActionArea, CardActions, CardContent,CardMedia,Button,Typography ,Grid } from '@material-ui/core';

 class MyProduct extends Component {

    componentDidMount(){
     
      this.props.getAdminProducts()
        // console.log(this.props)
        
    }


  renderProducts (){
    const { products, loading } = this.props.data;
    const {id} = this.props.user

    
    let productLoading = !loading ? (
      products.map((prod) => <ProdCard key={prod.id} prod={prod} userId={id} />)
    ) : <Spin />;
    return productLoading


  }


    render() {
    
        return (
          <Fragment>
            <Button variant="outlined" color="primary" href="/addproduct" fullWidth>Add</Button>
              <Wrapper>
                {this.renderProducts()}
              </Wrapper>
            </Fragment>
            
        )
    }
}



const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error,
    user:state.user
  });


export default connect(mapStateToProps, {getAdminProducts})(MyProduct);
