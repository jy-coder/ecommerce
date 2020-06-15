import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {Card,CardActionArea, CardActions, CardContent,CardMedia,Button,Typography ,Grid } from '@material-ui/core';
import Msg  from './../components/Msg'



export const ProdCard = (props) =>{
    const {
        prod: {
            title,
            price,
            id,
            description,
            user
        }
        // user: {
        //   authenticated,
        //   credentials: { handle }
        // }
      } = props;
 
  return (
    <Grid item xs={3}>
      <Card variant="outlined">
      <Typography variant="body2" color="textSecondary" component="p">
           Sell by: {user.name}
          </Typography>
      <CardActionArea>
        <CardMedia
        
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <Link to={`/product/${id}`}>{title}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${price}
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

