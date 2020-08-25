import React, {useState,useEffect} from 'react';
import {  addProduct, getCategories} from './../redux/actions/productActions';
import {Button, Box,TextField,NativeSelect} from '@material-ui/core';
import { connect } from 'react-redux';
import history from '../utils/history';
import Main from './../components/Main'




const AddProd = ({addProduct,getCategories,data}) =>{
    const [state, setState]= useState({title:"", description:"", price:0,subsubcategoryId:0})


  
    useEffect(() => {
      getCategories()
    },[getCategories]);
  
  
    const submitHandler =(e) =>{

      e.preventDefault();
      

      addProduct(state.title, state.description,state.price,state.subsubcategoryId)

      setTimeout(() => {
        history.push('/manage')
      }, 500);
     
      
    }
  
  

  
  const inputChangeHandler  = e  => {
    setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }


  
    const renderCategoriesOpt = () =>{
      const { categories } = data;

      let categoriesLoading =  (
        categories.map(cat =>(
          <div key={cat.id}/>,
          cat.subcategories.map(
            subcat =>(
            <optgroup key={subcat.id} label={subcat.name}>
              { subcat.subsubcategories?
              subcat.subsubcategories.map(subsub => 
              (<option key={subsub.id} value={subsub.id}>{subsub.name}</option>)): null}
             </optgroup>
            )))
        )
      )
     
      return categoriesLoading
            

  
    }


   const renderItem = (
      <div className='form-wrapper'>
      <form onSubmit={(e) => submitHandler(e)}  >
      
      <Box flexDirection="column" p={1}>
      <Box>
          <TextField  id="title" onChange={inputChangeHandler} label="Name" fullWidth required/>
        </Box>
        <Box>
          <TextField id="price" onChange={inputChangeHandler} label="Price" fullWidth required/>
        </Box>
        <Box style={{marginTop:'10px'}}>
          <NativeSelect onChange={inputChangeHandler} id="subsubcategoryId" fullWidth required>
            {renderCategoriesOpt()}
            </NativeSelect>
        </Box>
      <Box>
      <TextField 
          id="description"
          label="Enter Content"
          rows={10}
          placeholder="Enter Content"
          multiline
          variant="outlined"
          fullWidth required
          onChange={inputChangeHandler}
        />
      </Box>
      </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth required style={{marginTop:'5px'}}>
           Add
          </Button>
    
      </form>
      </div>
   )
  
  
      return (
        <Main item={renderItem}/>
      )
  }
  const mapStateToProps = (state) => ({
    data: state.data
  });


export default connect(mapStateToProps,{addProduct,getCategories})(AddProd);
