import React, {useState} from 'react';
import {  addProduct } from './../redux/actions/productActions';
import {Button, Box, Input, TextField} from '@material-ui/core';
import { connect } from 'react-redux';


const AddProd = ({addProduct}) =>{
    const [image, setImage] = useState("")
    const [state, setState]= useState({title:"", description:"", price:""})
    const [preview, setPreview] = useState("")
  
  
  
  
    const submitHandler = (e) =>{
      e.preventDefault();
      // console.log(state)
      const form = new FormData();
  
      form.append('title', state.title);
      form.append('description', state.description);
      form.append('price', state.price);
      form.append('imageUrl', image)

      addProduct(form)
      
     
 
  
      
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
        <section>
        <form onSubmit={(e) => submitHandler(e)}  >
        
        <Box flexDirection="column" p={1}>
        <Box>
            <TextField  id="title" onChange={inputChangeHandler} label="Name"/>
          </Box>
          <Box>
            <TextField id="price" onChange={inputChangeHandler} label="Price"/>
          </Box>
          <Box>
            <input type="file" accept='photo/*' onChange={imageHandler}/>
          </Box>
        <Box>
          <img src={preview} alt="" style={{width: "100px"}}/>
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

            <Button autoFocus type="submit" color="primary" >
             Add
            </Button>
      
        </form>
          </section>
      )
  }
  const mapStateToProps = (state) => ({
    data: state.data
  });


export default connect(mapStateToProps,{addProduct})(AddProd);
