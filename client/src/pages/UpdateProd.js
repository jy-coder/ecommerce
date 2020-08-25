import React, {useEffect,useState} from 'react'
import {updateProduct,getEditProduct, getCategories} from  './../redux/actions/productActions'
import { connect } from 'react-redux';
import {Button, Box, InputLabel, TextField,NativeSelect,Typography} from '@material-ui/core';
import history from '../utils/history';
import {Spin} from '../components/Spin'
import Main from '../components/Main'

function UpdateProd({match,data,getEditProduct,getCategories,updateProduct}) {

    const {title,price,description,subsubcategoryId,subsubcategory} = data.product
   
    const [state, setState]= useState({title:"", description:"", price:0,subsubcategoryId:0})

    

    useEffect(() => {
        getEditProduct(match.params.id)
        getCategories()
    },[getEditProduct, getCategories,match.params.id])



    const submitHandler = (e) =>{
        e.preventDefault();
        let newProduct = {}
    if(state.title)
        newProduct["title"]=state.title
    if(state.description)
      newProduct["description"]=state.description
    if(state.price)
      newProduct["price"]=state.price
    if(state.subsubcategoryId)
      newProduct["subsubcategoryId"]=state.subsubcategoryId


  
    updateProduct(match.params.id,newProduct)
    
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
            cat.subcategories
            .map(
              subcat =>(
              <optgroup key={subcat.id} label={subcat.name}>
                { subcat.subsubcategories?
                subcat.subsubcategories.filter(_ => _.id !== subsubcategoryId).map(subsub => 
                (<option key={subsub.id} value={subsub.id}>{subsub.name}</option>)): null}
               </optgroup>
              )))
          )
        )
       
        return categoriesLoading
              
  
    
      }

      let renderItem;

    if(title)
     renderItem =  (
        <div className='form-wrapper'>
        <form onSubmit={(e) => submitHandler(e)}  >
        <Box flexDirection="column" p={1}>
            <Box>
                <TextField  id="title" onChange={inputChangeHandler} label="Name" defaultValue={title} fullWidth/>
            </Box>
            <Box>
                <TextField id="price" onChange={inputChangeHandler} label="Price" defaultValue={price} fullWidth/>
            </Box>
            <Box style={{marginTop:'10px'}}>
             
              <InputLabel><Typography variant="subtitle1" style={{fontSize:'13px'}}> Subcategory Name</Typography></InputLabel>

            <NativeSelect onChange={inputChangeHandler} id="subsubcategoryId" fullWidth>
              <option defaultValue>{subsubcategory.name}</option>
              {renderCategoriesOpt()}
            </NativeSelect>
          </Box>
            <Box style={{marginTop: '15px'}}>
            <TextField 
                id="description"
                label="Enter Content"
                rows={10}
                placeholder="Enter Content"
                multiline
                variant="outlined"
                fullWidth
                onChange={inputChangeHandler}
                defaultValue={description}
            />
            </Box>
        </Box>

            <Button autoFocus type="submit" color="primary" variant="contained" fullWidth >
             Update
            </Button>
      
        </form>
        </div>
      )
    else{
      renderItem=<Spin/>
    }
         
    

      
        return (
          <Main item={renderItem} />
        )

  
      }




  
  const mapStateToProps = (state) =>({
    data: state.data
  
  })
  
  export default connect(mapStateToProps,{getEditProduct,updateProduct, getCategories})(UpdateProd)