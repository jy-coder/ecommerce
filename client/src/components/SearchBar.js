import React,{useState} from 'react';
import {TextField,Button} from '@material-ui/core';
import './SearchBar.css'
import { MdSearch } from 'react-icons/md';
import history from '../utils/history';


export default function SearchBar() {
    const [search, setSearch] = useState("")


    const handleChange  = e  => {
     setSearch(e.target.value)
    }

    const handleSubmit = e =>{
        history.push(`/search/${search}`)
    }
  
    return (
      <form className='nav-searchbar' onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth onChange={handleChange}/>
        <Button type='submit'><MdSearch size={32}/></Button>
      </form>
    );
  }