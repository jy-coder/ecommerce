import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux';
import { getAdminProducts } from './../redux/actions/productActions'
import {Spin} from './../components/Spin'
import ProdCard from '../components/ProdCard' 
import Wrapper from '../components/Wrapper'
import Main from '../components/Main'
import {Button} from '@material-ui/core';
import Paginate from './../components/Paginate'

 class MyProduct extends Component {

    componentDidMount(){
     
      this.props.getAdminProducts()
        
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
        const renderItem = (  
        <Fragment>
          <Button variant="outlined" color="primary" href="/addproduct" fullWidth>Add</Button>
            <Wrapper>
              {this.renderProducts()}
            </Wrapper>
          </Fragment>
          )
        return (
          <div>
            <Main item={renderItem}/> 
            <Paginate count={this.props.data.myProductPage} option={"product"}/>
          </div>
        )
    }
}



const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error,
    user:state.user
  });


export default connect(mapStateToProps, {getAdminProducts})(MyProduct);
