import React from 'react'
import {Grid,Typography} from '@material-ui/core';

function HistoryCard({item}) {
    // console.log(item)
    return (
        <div>
            <Grid container item xs={12} >
                    <Grid item xs={2}>
                        <img src={`https://fw-img-bucket.s3-ap-southeast-1.amazonaws.com/${item.imageUrl}`} style={{height:'50px', width:'50px'}}/>
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
       
      </div>
    )
}

export default HistoryCard
