import React, {useState} from 'react';
import {  addProduct } from './../redux/actions/productActions';
import {Button, Box, Input, TextField,NativeSelect} from '@material-ui/core';
import { connect } from 'react-redux';
import history from '../utils/history';



const AddProd = ({addProduct}) =>{
    const [image, setImage] = useState("")
    const [state, setState]= useState({title:"", description:"", price:""})
    const [preview, setPreview] = useState("")

  
  
  
  
    const submitHandler =(e) =>{
      e.preventDefault();
      // console.log(state)
      const form = new FormData();
  
      form.append('title', state.title);
      form.append('description', state.description);
      form.append('price', state.price);
      form.append('imageUrl', image)

    addProduct(form)

      setTimeout(() => {
        history.push('/manage')
      }, 3000);
     
      
    }
  
  
  
    const imageHandler = e =>{
      if(e.target.files[0]){
      let file = e.target.files[0]
      setImage(file);
    
      URL.revokeObjectURL(preview);
      let url = URL.createObjectURL(file);
      setPreview(url)
      }
  }
  
  const inputChangeHandler  = e  => {
    setState({
        ...state, 
        [e.target.id]: e.target.value
      });
    }
  
  
  
  
      return (
        <div className='form-wrapper'>
        <form onSubmit={(e) => submitHandler(e)}  >
        
        <Box flexDirection="column" p={1}>
        <Box>
            <TextField  id="title" onChange={inputChangeHandler} label="Name" fullWidth/>
          </Box>
          <Box>
            <TextField id="price" onChange={inputChangeHandler} label="Price" fullWidth/>
          </Box>
          <NativeSelect onChange={inputChangeHandler} >
                <option value=''>Default</option>
                <option value={'price|asc'}>Price: Low To High</option>
                <option value={'price|desc'}>Price: High To Low</option>
            </NativeSelect>
          <Box style={{marginTop:'10px'}}>
            <input type="file" accept='photo/*' onChange={imageHandler}/>
          </Box>
        <Box>
          <img src={preview} alt="" style={{width: "100px", marginTop:"10px", marginBottom:"10px"}}/>
        </Box>
        <Box>
        <TextField 
            id="description"
            label="Enter Content"
            rows={10}
            placeholder="Enter Content"
            multiline
            variant="outlined"
            fullWidth
            onChange={inputChangeHandler}
          />
        </Box>
        </Box>

            <Button autoFocus type="submit" variant="contained" color="primary" fullWidth style={{marginTop:'5px'}}>
             Add
            </Button>
      
        </form>
        </div>
      )
  }
  const mapStateToProps = (state) => ({
    data: state.data
  });


export default connect(mapStateToProps,{addProduct})(AddProd);
