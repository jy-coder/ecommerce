import React from 'react'
import {Grid, Paper, Typography, Button, ButtonBase} from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Rating}from '@material-ui/lab';

function ReviewCard({review}) {
    const {text,rating,updatedAt,user} = review
    dayjs.extend(relativeTime);
    return (
        <div>
        <Paper>
          <Grid container spacing={2} style={{margin:'15px'}}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="h5">
                    {user.name}   
                  </Typography>
                  <Typography variant="caption">
                  {dayjs(updatedAt).fromNow()}
                  </Typography>
                  <Typography variant="subtitle1">
                  <Rating  value={Math.round(rating * 10)/10} readOnly />
                  </Typography>
                  <Typography variant="subtitle1">
                    {text}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
}

export default ReviewCard
