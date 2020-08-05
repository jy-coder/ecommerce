import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Popper,Paper,MenuList, MenuItem,ClickAwayListener,Grow} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom'
import {logoutUser} from './../redux/actions/userActions'
import {MdMenu} from 'react-icons/md'

const useStyles = makeStyles((theme) => ({
  container:{
    width:"100%",
    // display: 'flex',
    // justifyContent:'flex-start',
    position:'relative',
    // marginLeft: '-15px'
    left: '-15px'
   
  },
  pop:{
    width: '95vh',
    position: 'relative',
    marginTop: 10
  }
}));
function MenuBtn() {
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

  const logoutHandler = () =>{
    logoutUser()
    handleClose()
    
  }

    return (
        <div className={classes.container}>
          <Button color="inherit"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MdMenu size={28}/>
        </Button>
        <Popper open={open} className={classes.pop} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose} className='remove-underline'><Link to ="/manage">Manage My Products</Link></MenuItem>
                    <MenuItem onClick={handleClose} className='remove-underline'><Link to ="/orderhistory">Order History</Link></MenuItem>
                    <MenuItem onClick={() => logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
    )
}

export default MenuBtn
