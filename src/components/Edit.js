import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
    editbutton: {
    variant: 'outlined',
    disableRipple: 'true',
    marginLeft: '1.05vw',
    height: '4.7vh',
    width: '5.3vw',
    paddingLeft: '5px',
    fontSize: '1.056vw',
     fontFamily: 'Ubuntu',
    color: '#97A1A9',
    borderRadius: '0.5rem',
    border: '0.04rem solid #97A1A9;',
    letterSpacing: '0px',
    textTransform: 'none',
    },
    buttonResetColor:{
        color:"white",
        backgroundColor:"transparent",
        border: "1px solid #14AFF1"
  },
    buttonSaveColor:{
        color:"white",
        backgroundColor:"#14AFF1"
  },
    buttonCancelColor:{
      color:"#14AFF1",
      right: pxToRem(120),
  },
    styledText: {
      width: '25ch',
      width: pxToVw(180),
      height: pxToVh(37),
      background: "#283A46 0% 0% no-repeat padding-box ",
      border: "1px solid #356680",
      borderRadius: "5px",
      opacity: "1",
      textTransformation: "none",
      textAlign: "center",
      color:'white',
    },
    
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor:"#2A3F4D",
    color:'white',
    display: "flex",
     flexGrow: 1,
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
    padding: theme.spacing(1),
    backgroundColor: "#2A3E4C",
    color: "white"
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: "#2A3E4C"
  }
}))(MuiDialogActions);

export default function EditButton(props) {
    console.log(props.selected);
    const [employee, setemployee] = React.useState({ 
        total_open_amount: 0,
        notes: '',
    });  
   const Edit = (values) => {  
    const data = { name_customer:employee.name_customer, 
    cust_number: employee.cust_number }
    axios.get(`http://localhost:8080/1806199/edit2.do?total_open_amount=${employee.total_open_amount}&notes=${employee.notes}&doc_id=${values}`)  
     .then((response) => {  
            alert("Successful")
        })
        .catch(err => 
        alert(err));
  };  
    const openEdit=()=>{
      const values=props.selected[0];
      Edit(values);
      handleClose();
    }
    const onChange = (e) => {  
      e.persist();  
    setemployee({...employee, [e.target.name]: e.target.value});  
}  
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen} className={classes.root, classes.editbutton} variant="outlined" color="primary" disableElevation startIcon={<EditIcon />}>
      Edit
    </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Invoice
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <span>Bill Amount</span>
            <span> &nbsp;&nbsp;
            <TextField
              id="outlined-secondary"
              onChange={ onChange }
              className={classes.styledText}
              name="total_open_amount"
              />
              </span>
          </div>
          &nbsp;&nbsp;
          <div>
            <span>Notes</span>
            <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              variant="outlined"
              color="primary"
              onChange={ onChange }
              name="notes"
              />
              </span>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.buttonCancelColor} >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleClose}
            text-align="left"
            className={classes.buttonResetColor}
          >
            Reset
          </Button>
          <Button
            autoFocus
            onClick={openEdit}
            color="primary"
            variant="contained"
            font="normal normal normal 20px/24px Ubuntu"
            letter-spacing="0px"
            opacity="1"
            className={classes.buttonSaveColor}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}