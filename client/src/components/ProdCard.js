import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {Card,CardActionArea, CardActions, CardContent,CardMedia,Button,Typography ,Grid } from '@material-ui/core';
import Msg  from './../components/Msg'
import {Rating}from '@material-ui/lab';



export const ProdCard = (props) =>{
    const {
        prod: {
            title,
            price,
            id,
            description,
            imageUrl,
            user,
            ratingAvg,
            reviewCount
        }
      } = props;
 
  return (
    <Grid item xs={3} style={{ display:'flex', justifyContent:'center' }}>
      <Card variant="outlined">
      <Typography variant="body2" color="textSecondary" component="p">
           Sell by: {user.name}
          </Typography>
      <CardActionArea>
        <img src = {`/${imageUrl}`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/product/${id}`}>{title}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <Rating name="read-only" value={Math.round(ratingAvg * 10)/10} readOnly />({reviewCount})
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Msg prodId={id}/>
      </CardActions>
      </Card>
    </Grid>
  );
}

