import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import companyLogo from '../assets/companyLogo.svg';
import logo from '../assets/logo.svg';

const useStyles = makeStyles(theme =>({
    paper:{
        //backgroundColor: 'rgba(88, 104, 126, 1)',
        backgroundColor:'#39495E',
        borderRadius:0,
        display:'flex',
        color:'rgba(255, 255, 255, 1)'
    }
        
}));
//,width:'16.6015625vw',height:'6.329113924050633vh' padding:'2vh',paddingLeft:'30vh'
const Header=()=>{
    const classes=useStyles();
    return(
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Paper elevation={0} className={classes.paper}>
                    <img src={companyLogo} style={{padding:'2vh',width:'2.8645833333333335vw',height:'5.822784810126582vh',paddingTop:'1vh'}}></img>
                    <b style={{font:'Futura PT',fontWeight:'101.26582278481013vh',fontSize:'3.7974683544303796vh',paddingTop:'1vh'}}>ABC Products</b>
                    <img src={logo}  style={{height:'5vh' ,width:'15.299479166666666vw',paddingLeft:'50vh',paddingTop:'1.5vh'}}></img>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Header;