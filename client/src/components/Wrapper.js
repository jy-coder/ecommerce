import React from 'react'
import {Grid} from '@material-ui/core';
import './Wrapper.css'

const Wrapper = (props) => {
    return (
        <Grid container spacing={1} className="Wrapper">
            {props.children}
        </Grid>
    )
}

export default Wrapper 

