import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme =>({
    paper:{
        backgroundColor: '#39495E',
        borderRadius:0,
        color:'rgba(255, 255, 255, 1)'
    }
        
}));

const GridHeader=()=>{
    const classes=useStyles();
    return(
        <React.Fragment>
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Paper elevation={0} className={classes.paper} style={{paddingTop:'3vh',paddingLeft:'2vh',fontSize:'2.5vh',paddingBottom:'3vh'}}>Invoice List</Paper>
            </Grid>
        </Grid>
    </React.Fragment>
    );
}

export default GridHeader;