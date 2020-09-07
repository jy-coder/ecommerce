import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import history from '../utils/history';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar() {
  const classes = useStyles();

  const [search, setSearch] = useState("")


  const handleChange  = e  => {
   setSearch(e.target.value)
  }

  const handleSubmit = () =>{
      history.push(`/search/${search}`)
  }

  const handleKeyDown =(event)=> {
    if (event.keyCode === 'Enter') {
        handleSubmit()
    }
}

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <InputBase
          className={classes.input}
          onChange={handleChange}
          onKeyDown = {handleKeyDown}
          placeholder="Search Product Name"
    
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      


    </Paper>
  );
}
