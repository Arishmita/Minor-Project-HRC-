import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import React, {Component, useState} from 'react';
import Delete from './Delete';
import Edit from './Edit';
import AddMod from './AddMod';
import SearchBar from './SearchBar';

export default function Actions(props)
{
  const useStyles = makeStyles((theme) => ({
   root: {
     display: "flex",
     flexGrow: 1,
        },
   grid:{
     backgroundColor: '#273D49CC',
     marginTop:"3vh",
     paddingTop:"1.3vh",
     width: "96vw",
     height: "80vh",
     borderRadius: '0.4rem',
    },
   predict:{
     variant: 'contained',
     disableRipple: 'true',
     height: '4.7vh',
     width: '5.5vw',
     paddingLeft: '0.5vw',
     verticalAlign: 'middle',
     fontSize: '1.056vw',
     fontFamily: 'Ubuntu',
     color: '#FFFFFF',
     backgroundColor:'#97A1A9',
     textTransform: 'none',
     letterSpacing: '0px',
     borderRadius: '0.5rem',
    },
   corres:{
     variant: 'outlined',
     disableRipple: 'true',
     marginLeft: '1vw',
     height: '4.7vh',
     width: '22vw',
     paddingLeft: '0.5vw',
     fontSize: '1.056vw',
     verticalAlign: 'middle',
     fontFamily: 'Ubuntu',
     color: '#97A1A9',
     borderRadius: '0.5rem',
     border: '0.04rem solid #97A1A9',
     textTransform: 'none',
    },
}));
    
const [addPopup,setAddPopup] = React.useState(false);
const classes = useStyles();
const selected=props.selected;
const responseData=props.responseData;
return (
 <Toolbar style={{backgroundColor:'#273D49CC'}}>
     <Button className={classes.predict} >Predict</Button>
     <Button className={classes.corres}>View Correspondence</Button>
     <AddMod/>
     <Edit selected={selected}/>
     <Delete selected={selected}/>
     <SearchBar responseData={responseData}/>
  </Toolbar>
    )
}