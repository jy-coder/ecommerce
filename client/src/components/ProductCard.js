import React from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';

function ProductCard({item}) {
    console.log(item)
    return (
        <div>
        <Paper>
            <Grid container item xs={12} sm container>
                <Grid container spacing={2} xs={11}>
                    <Grid item xs={2}>
                        <img src={`/${item.imageUrl}`} style={{height:'50px', width:'50px'}}/>
                    </Grid>
                    <Grid item xs={10} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography variant="body2">
                                {item.title}
                                </Typography>
                                <Typography variant="body2">
                                Qty: {item.orderItem.quantity}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
      </div>
    )
}

export default ProductCard
