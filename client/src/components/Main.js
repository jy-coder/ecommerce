import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Button, Menu}from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { getProducts,  getCategories,setCategoryOpt,getSubcategories, setSubcategoryOpt} from '../redux/actions/productActions'
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
  popoverContentSecond: {
    pointerEvents: 'auto',
    left: '130px !important'
   
  },
  popoverSecond: {
    pointerEvents: 'none',
    left: '130px !important'

  },
  flexContent:{
    position:'relative',
    width:'100%',
    display:'flex', 
    justifyContent:'flex-start'
  }

}));

function Main({getProducts, getCategories,setCategoryOpt,item,data,setSubcategoryOpt}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSecond, setAnchorElSecond] = React.useState(null);

  useEffect(() => {
    getCategories()
  },[]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (subsubcat) => {
    history.push(`/search/CATEGORYNAME${subsubcat.id}${subsubcat.name}`)
  };



  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleMouse = (event, cat) =>{
    setCategoryOpt(cat.id)
     setAnchorEl(event.currentTarget);
     
   }


   const handleCloseSecond = (event) => {
    setAnchorElSecond(null);
  };
  const handleMouseSecond = (event, subcat) =>{
    setSubcategoryOpt(subcat.id)
     setAnchorElSecond(event.currentTarget);
     
   }

   const renderSubsubcategories = () =>{
    const {subsubcategory} = data
  if(subsubcategory.subsubcategories){
    var subsubcategoriesLoading = (
      subsubcategory.subsubcategories.map((subsubcat) =>
              <Button key={subsubcat.id}  className={classes.flexContent} onClick={() => handleClick(subsubcat)}>
              {subsubcat.name}
              </Button>
      ))
      return subsubcategoriesLoading
    }
    
   }


  const renderSubcategories = () =>{
  
    const {subcategory} = data
    if(subcategory.subcategories)
      var subcategoriesLoading = (
        subcategory.subcategories.map((subcat) =>
            <div  key={subcat.id}>
                <Button  onMouseEnter={(e) => handleMouseSecond(e,subcat)}  aria-controls="simple-menu2"  aria-haspopup="true" className={classes.flexContent}>
                {subcat.name}
                </Button>


                <Menu
                id="simple-menu2"
                anchorEl={anchorElSecond}
                keepMounted
                open={Boolean(anchorElSecond)}
                onClose={handleCloseSecond}
                className={Boolean(anchorElSecond) ? classes.popoverSecond : classes.popoverContentSecond}
                >
                <div onMouseLeave={handleCloseSecond} className={Boolean(anchorElSecond) ? classes.popoverContentSecond : classes.popoverSecond} >
                  {renderSubsubcategories()}
                </div>
                </Menu>
              </div>
              
          )
      )
    return subcategoriesLoading
}


  const closeAll = () =>{
    handleCloseSecond()
    handleClose()
  }
  
  const renderCategories = () => {
    const { categories } = data;
    let categoriesLoading = (
      categories.map((cat) => 
        <div key={cat.id}>
          <Button  onMouseOver={handleCloseSecond}  aria-controls="simple-menu" aria-haspopup="true" className={classes.flexContent} 
          onMouseEnter={(e) => handleMouse(e,cat)} key={cat.id}>
            {cat.name}
        </Button>
        
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose, handleCloseSecond}
            className={Boolean(anchorEl) ? classes.popover : classes.popoverContent}
          >
          <div  className={Boolean(anchorEl) ? classes.popoverContent : classes.popover} >
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
      <Drawer 
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader} >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List onMouseLeave={closeAll} >
       
            <Box>
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

export default connect(mapStateToProps, {getProducts, getCategories,setCategoryOpt,getSubcategories,setSubcategoryOpt})(Main);
