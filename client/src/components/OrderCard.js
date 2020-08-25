import React from 'react'
import {Grid, Typography,Avatar} from '@material-ui/core';





const OrderCard = ({item}) => {
  
    return (
  
        <Grid container spacing={4}>
          <Grid item xs={3}>
              <Avatar style={{height:'50px', width:'50px'}}/>
          </Grid>
          <Grid item xs={9} container>
            <Grid item xs container direction="row">
                <Grid item xs={12}>
                  <Typography variant="subtitle1" >
                    {item.title}
                  </Typography>
                </Grid>
                <Grid item xs={12} container  >
                    <Grid item xs={6}>
                        <Typography variant="caption">
                          Qty:{item.quantity} 
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption">
                          Price:${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>

              </Grid>
              </Grid>

          </Grid>
    
   
 
  );
}




export default OrderCard;