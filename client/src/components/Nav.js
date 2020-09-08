import React, { Fragment} from 'react';
import {AppBar, Toolbar,Typography,Button,Popper,Paper,MenuList, MenuItem,ClickAwayListener,Grow} from '@material-ui/core';
import {makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from './../redux/actions/userActions'
import SearchBar from './../components/SearchBar'
import {MdShoppingCart} from 'react-icons/md'
import MenuBtn from './../components/MenuBtn'
import './Nav.css'

const theme = createMuiTheme({   
  overrides: {     
    MuiAppBar: {       
      colorPrimary: {         
        backgroundColor: "black" 
      }
    }
  }
})

const useStyles = makeStyles((theme) => ({
  container:{
    width:"100%"
  },
  root: {
    flexGrow: 1,
    width:'100%',
    backgroundColor:'black'
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    flexGrow: 1,
  },
  end:{
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    alignContent:"flex-end"

  },
  search:{
    flexGrow: 1,
    justifyContent:"center",
    
    
  },
  toggle: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
  },
  shopBtn: {
    [theme.breakpoints.up("sm")]: {
      position:'relative',
      left: '-200px'
    }
  }
}));


//can add functionality => more responsive for category portion & search bar
function Nav({user,logoutUser,item}) {
  const {authenticated} = user
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  let routes
  
    if(authenticated){
     routes = (
    <Fragment>
      <Typography variant="h6" className={classes.toggle}>
        <MenuBtn/>
      </Typography>
      <Typography variant="h6" className={classes.title}>
        {item ? item: null}
    
      </Typography>

      <Typography variant="h6">
          <Button color="inherit" href="/" className={classes.shopBtn}>Shop</Button>
      </Typography>
      <Typography variant="h6" className={classes.search}>
        <SearchBar/>
      </Typography>
      

     
      <Button color="inherit" href="/cart"><MdShoppingCart size={32}/></Button>
      <Typography variant="h6" className={classes.end}>
        <Button color="inherit"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Account
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className='nav-menu-account'>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose} ><Link to ="/manage" className='remove-underline'>Manage My Products</Link></MenuItem>
                    <MenuItem onClick={handleClose} ><Link to ="/orderhistory" className='remove-underline'>Order History</Link></MenuItem>
                    <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                    <div>


                    </div>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </Typography>
    </Fragment>
    )}

    else{
      routes = (
      <Fragment>
         <Typography variant="h6" className={classes.toggle}>
        <MenuBtn/>
      </Typography>
      <Typography variant="h6" className={classes.title}>
        {item ? item: null}
        <Button color="inherit" href="/">Shop</Button>
      </Typography>
      <Typography variant="h6" className={classes.search}>
        <SearchBar/>
      </Typography>
        <Button color="inherit" href="/login">Login</Button>
        <Button color="inherit" href="/signup">Register</Button>
      </Fragment>

    )

  }



  return (
    <div className={classes.root} >
     <ThemeProvider theme={theme}>
      <AppBar position="relative" style={{backgroundColor: 'black'}}>
        <Toolbar>
         {routes}
        </Toolbar>
      </AppBar>
      </ThemeProvider>
     
    </div>
  );
}



const mapStateToProps = (state) => ({
  data: state.data,
  cartData: state.cartData,
  orderData: state.orderData,
  user : state.user
});


export default connect(mapStateToProps,{logoutUser})(Nav);
