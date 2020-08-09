import React, {useEffect,useState} from 'react'
import {updateProduct,getEditProduct, getCategories} from  './../redux/actions/productActions'
import { connect } from 'react-redux';
import {Button, Box, InputLabel, TextField,NativeSelect,Typography} from '@material-ui/core';
import history from '../utils/history';
import {Spin} from '../components/Spin'

function UpdateProd({match,data,getEditProduct,getCategories,updateProduct}) {

    const {title,imageUrl,price,description,subcategoryId,subcategory} = data.product
    const [image, setImage] = useState("")
    const [state, setState]= useState({title:"", description:"", price:0,subcategoryId:0})
    const [preview, setPreview] = useState("")
    

    useEffect(() => {
        getEditProduct(match.params.id)
        getCategories()
    },[getEditProduct])



    const submitHandler = (e) =>{
        e.preventDefault();
        const form = new FormData();
    if(state.title)
        form.append('title', state.title);
    if(state.description)
        form.append('description', state.description);
    if(state.price)
        form.append('price', state.price);
    if(state.categoryId)
        form.append('subcategoryId', state.subcategoryId)
    if(image){
        // console.log(imageUrl)
        form.append('imageUrl', image) // new image
        form.append('oldImage',imageUrl) //old image string

    }

    // console.log(image, imageUrl)
  
    updateProduct(match.params.id,form)
    
    setTimeout(() => {
        history.push('/manage')
      }, 500);
       
        
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
            return <img src = {preview}  style={{width: "100px", marginTop:"10px", marginBottom:"10px"}}/>
          }
          else
            return <img src={`https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/${imageUrl}`}  style={{width: "100px", marginTop:"10px", marginBottom:"10px"}}/>
      }
      

      const renderCategoriesOpt = () =>{
        const { categories } = data;
        let categoriesLoading =  (
          categories.map((cat) =><optgroup key={cat.id} label={cat.name}>
            {cat.subcategories.filter(_ => _.id !== subcategoryId)
            .map(subcat =><option key={subcat.id} value={subcat.id}>{subcat.name}</option> )}
          </optgroup>)
        ) 
        return categoriesLoading

    
      }

      if(title)
      return (
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
          
            <NativeSelect onChange={inputChangeHandler} id="subcategoryId"  fullWidth required defaultValue={subcategory.name}>
              {renderCategoriesOpt()}
            </NativeSelect>
          </Box>
            <Box style={{marginTop:'10px'}}>
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

            <Button autoFocus type="submit" color="primary" variant="contained" fullWidth >
             Update
            </Button>
      
        </form>
        </div>
      )
      else
        return <Spin/>
  
  }




  
  const mapStateToProps = (state) =>({
    data: state.data
  
  })
  
  export default connect(mapStateToProps,{getEditProduct,updateProduct, getCategories})(UpdateProd)