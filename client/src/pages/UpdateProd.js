import React, {useEffect,useState} from 'react'
import {updateProduct,getProduct} from  './../redux/actions/productActions'
import { connect } from 'react-redux';
import {Button, Box, Input, TextField} from '@material-ui/core';
import history from '../utils/history';
import {Spin} from '../components/Spin'

function UpdateProd({match,data,getProduct,updateProduct}) {

    const {title,imageUrl,price,description} = data.product
    const [image, setImage] = useState("")
    const [state, setState]= useState({title:"", description:"", price:""})
    const [preview, setPreview] = useState("")
    

    useEffect(() => {
        getProduct(match.params.id)
    },[getProduct])



    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(image)
        const form = new FormData();
    if(state.title)
        form.append('title', state.title);
    if(state.description)
        form.append('description', state.description);
    if(state.price)
        form.append('price', state.price);
    if(image)
        form.append('imageUrl', image)
  
    updateProduct(match.params.id,form)
    
    history.push('/manage')
       
        
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


      const displayPreview = () =>{
          if(preview){
            return <img src = {preview}  style={{width: "100px"}}/>
          }
          else
            return <img src={`/${imageUrl}`}  style={{width: "100px"}}/>
      }

      if(title)
      return (
        <form onSubmit={(e) => submitHandler(e)}  >
        <Box flexDirection="column" p={1}>
            <Box>
                <TextField  id="title" onChange={inputChangeHandler} label="Name" defaultValue={title}/>
            </Box>
            <Box>
                <TextField id="price" onChange={inputChangeHandler} label="Price" defaultValue={price}/>
            </Box>
            <Box>
                <input type="file" accept='photo/*' onChange={imageHandler}/>
            </Box>
            <Box>
                {displayPreview()}
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
                defaultValue={description}
            />
            </Box>
        </Box>

            <Button autoFocus type="submit" color="primary" >
             Update
            </Button>
      
        </form>
      )
      else
        return <Spin/>
  
  }




  
  const mapStateToProps = (state) =>({
    data: state.data
  
  })
  
  export default connect(mapStateToProps,{getProduct,updateProduct})(UpdateProd)