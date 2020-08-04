import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {getProducts,setSortOrder} from './../redux/actions/productActions'
import { connect } from 'react-redux';


function SelectBox({getProducts,setSortOrder,data,search}) {
    const handleChange  = e  => {
        const splitValue  =e.target.value.split('|')
        const sortBy = splitValue[0]
        const orderBy = splitValue[1]
        setSortOrder(sortBy,orderBy)
        getProducts(data.limit,search,sortBy,orderBy,data.categoryId)
    }


  return (
    <div>
        <FormControl>
            <NativeSelect onChange={handleChange}>
                <option value=''>Default</option>
                <option value={'price|asc'}>Price: Low To High</option>
                <option value={'price|desc'}>Price: High To Low</option>
            </NativeSelect>
        </FormControl>
    </div>
  );
}


const mapStateToProps = (state) => ({
    data: state.data,
    errorData: state.error
  });


export default connect(mapStateToProps, {getProducts,setSortOrder})(SelectBox);
