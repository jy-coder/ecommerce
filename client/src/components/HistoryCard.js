import React from 'react'
import {Grid,Typography,Avatar} from '@material-ui/core';

function HistoryCard({item}) {
    // console.log(item)
    return (
      
            <Grid container item xs={12} >
                    <Grid item xs={2}>
                        <Avatar variant="square" style={{height:'50px', width:'50px'}}/>
                    </Grid>
                    <Grid item xs={10} container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Typography variant="body2">
                            {item.title}
                            </Typography>
                            <Typography variant="body2">
                            Qty: {item.orderItem.quantity}
                            </Typography>
                            <Typography variant="body2">
                            Price: ${item.price}
                            </Typography>
                        </Grid>
                </Grid>
            </Grid>
       
      
    )
}

export default HistoryCard
