import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Button,Grid, MenuItem, Menu}from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { getProducts, loadMoreProducts, getCategories,setSubcategoriesOpt,getSubcategories} from '../redux/actions/productActions'
import {Spin} from './Spin'
import ProdCard from './ProdCard'
import NavBar from './Nav'
import history from '../utils/history';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position:'relative',
    width:'20px'
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  popover: {
    pointerEvents: 'none',
    left: '180px !important'
  },
  popoverContent: {
    pointerEvents: 'auto',
    left: '180px !important'
  },
  flexContent:{
    position:'relative',
    width:'100%',
    display:'flex', 
    justifyContent:'flex-start'
  }

}));

function Main({getProducts, getCategories,setSubcategoriesOpt,item,data}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    getCategories()
  },[]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleMouse = (event, cat) =>{
    setSubcategoriesOpt(cat.id)
     setAnchorEl(event.currentTarget);
     
   }


  const renderSubcategories = () =>{
    const {subcategory} = data
    if(subcategory.subcategories)
      var subcategoriesLoading = (
        subcategory.subcategories.map((subcat) =>
              <MenuItem id={`menu-${subcat.id}`}  key={subcat.id}>{subcat.name}</MenuItem>
          )
      )
    return subcategoriesLoading
}


  const renderAllBtn = () =>(
    <Button style={{padding:'0', position:'relative',left: '-10px'}}
    onClick={()=> getProducts(data.limit,'',data.sortBy,data.orderBy)}
    >ALL </Button>
  )

  
  const renderCategories = () => {
    const { categories } = data;
    let categoriesLoading = (
      categories.map((cat) => 
        <div>
          <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.flexContent} 
          onMouseEnter={(e) => handleMouse(e,cat)} key={cat.id}>
            {cat.name}
        </Button>
        
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={Boolean(anchorEl) ? classes.popover : classes.popoverContent}
          >
          <div onMouseLeave={handleClose} className={Boolean(anchorEl) ? classes.popoverContent : classes.popover} >
          {renderSubcategories()}
          </div>
      </Menu>
    
    </div>
    
    
    )
    )
    return categoriesLoading

  }


  const sideBarBtn = (
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    className={clsx(classes.menuButton, open && classes.hide)}
  >
    <MenuIcon />
  </IconButton>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        
    <NavBar item={sideBarBtn}/>
     
      </AppBar>
      <Drawer  onMouseLeave={handleClose}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
       
            <Box  onMouseLeave={handleClose}>
            {renderCategories()}
            </Box>

       
        </List>
        <Divider />

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {item}
      </main>
    </div>
  );
}


const mapStateToProps = (state) => ({
    data: state.data,
    cartData: state.cartData,
    orderData: state.orderData,
    errorData: state.error
  });

export default connect(mapStateToProps, {getProducts, getCategories,setSubcategoriesOpt,getSubcategories})(Main);
