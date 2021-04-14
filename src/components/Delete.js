import React from "react";
import { withStyles,makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from '@material-ui/icons/Remove' ;
import  { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor:"#2A3F4D",
    color:'white'
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
    <Typography variant="h6">{children}</Typography>
    {onClose ? (
    <IconButton
    aria-label="close"
    className={classes.closeButton}
    onClick={onClose}
    >
    <CloseIcon />
    </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#2A3F4D',
    color: "white"
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
 root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: '#2A3F4D'
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  console.log(props.selected);
  const [data, setData] = useState([]);  
    const deleteeployee = (values) => {  
      axios.get(`http://localhost:8080/1806199/dlt.do?doc_id=${values}`)  
      .then((response) => {  
        console.log("Successful!")
        })
        .catch(err => 
        console.log(err.data));
    };  
 const [open, setOpen] = React.useState(false);
 const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openDelete=()=>{
    let i;
    const values=props.selected;
    for(i=0;i<values.length;i++)
      deleteeployee(values[i]);
    handleClose();
  }
  const useStyles= makeStyles((theme)=>({
    buttonCancelColor:{
    color:"white",
    backgroundColor:"transparent",
    border: "1px solid #14AFF1"
    },
    buttonSaveColor:{
    color:"white",
    backgroundColor:"#14AFF1"
    },
    changeDialog: {
    maxWidth : '47%', 
    maxHeight : '47%',
    display:'flex',
    justifyContent:"center",
     margin: 'auto'
    },
      spanEdit:{
          color:"#FF5E5E"
      }
      ,
  delete:{
    variant: 'outlined',
    disableRipple: 'true',
     marginLeft: '1.05vw',
    height: '4.7vh',
    width: '6.4vw',
    paddingLeft: '1px',
    fontSize: '1.056vw',
    fontFamily: 'Ubuntu',
    color: '#97A1A9',
    borderRadius: '0.5rem',
    border: '0.04rem solid #97A1A9',
    letterSpacing: '0px',
    textTransform: 'none',
    },
  }))
  const classes = useStyles();
  return (
    <div>
      <Button className={classes.delete} variant="outlined" color="primary" onClick={handleClickOpen}>
      <RemoveIcon style={{marginBottom: '0px', fontSize: '20px' }} />
        Delete
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.changeDialog}
      >
          <DialogTitle id="customized-dialog-title" onClose={handleClose} >
        <span style={{paddingLeft: '4px'}}>
          Delete record(s)?
        </span>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You'll lose your record(s) after this action. We can't recover them
            once you delete.
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to <span className={classes.spanEdit}>permanently delete</span> them?
          </Typography>
        </DialogContent>
        <DialogActions>
          <div>
        <Grid container spacing={2}>
         <Grid item>
        <Button autoFocus onClick={handleClose} color="primary" className={classes.buttonCancelColor}>
             Cancel
        </Button>
        </Grid>
        <Grid item>
        <Button variant="outlined" color="primary" className={classes.buttonSaveColor}
        onClick={openDelete}>
            Delete
        </Button>
        </Grid>
    </Grid>
    </div>
</DialogActions>
</Dialog>
</div>
  );
}