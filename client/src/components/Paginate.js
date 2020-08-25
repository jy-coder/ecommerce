import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from 'react-redux';
import { getAdminProducts } from './../redux/actions/productActions'
import { getOrders } from './../redux/actions/orderActions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center'

    },
  },
}));

function Paginate({getAdminProducts,getOrders,count, option}) {
  const classes = useStyles();



  useEffect(() => {
 
  }, [getAdminProducts]);


  useEffect(() => {
 
}, [getOrders]);

  const handleChange = (event, value) => {
    if(option === "product" )
        getAdminProducts(value)
    else if (option === "order")
        getOrders(value)
  };


  return (
    <div className={classes.root}>
      <Pagination count={count} onChange={handleChange} />
    </div>
  );
}


const mapStateToProps = (state) => ({
    data: state.data,
    errorData:state.error,
    user:state.user
  });


export default connect(mapStateToProps, {getAdminProducts,getOrders})(Paginate);
