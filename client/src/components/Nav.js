import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar,Typography,Button,IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Button color="inherit" href="/shop">Shop</Button>
          <Button color="inherit">Manage</Button>
          </Typography>
          <Button color="inherit">Orders</Button>
          <Button color="inherit" href="/cart">Cart</Button>
          <Link to="/login" ><Button color="inherit">Login</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}