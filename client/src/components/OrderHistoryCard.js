import React from 'react'
import {Grid, Paper, Typography} from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux'
import HistoryCard from './HistoryCard'

function OrderHistoryCard({item}) {
    dayjs.extend(relativeTime);
    const renderProducts = () =>{
      return item.products.map((item) =><HistoryCard key={item.id} item={item}/>)

    }


    return (
        // console.log(item.products),
        <div>
        <Paper>
          <Grid container spacing={2} style={{margin:'15px'}}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2} >
                <Grid item xs>
                  <Typography variant="caption" display='inline'>
                  orderId: #{item.id}   
                  </Typography>
    
                  <Typography variant="caption" display='inline' style={{marginLeft: '1rem'}}>
                  {dayjs(item.createdAt).format('YYYY/MM/DD HH:mm:ss')}
                  </Typography>
                  </Grid>
                    {renderProducts()}
                
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
}



const mapStateToProps = (state) => ({
    orderData:state.orderData
  });

export default connect(mapStateToProps)(OrderHistoryCard)
