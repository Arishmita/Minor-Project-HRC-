import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({

    root: {
        display: "flex",
        alignItems: "center",
        width: '40vh',
        height:'4.5vh',
        border:1,
        borderStyle:"solid",
        borderRadius:'1vh',
        borderColor:'#14AFF1',
        margin:'2vh'
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color:'#FFFFFF'
      },
  
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  return (
    <paper className={classes.root}>
    <InputBase
      className={classes.input}
      placeholder="Search by Bill Number"
      inputProps={{ "aria-label": "search" }}
   />
   <IconButton
      type="submit"
      className={classes.iconButton}
      aria-label="search"
   >
   <SearchIcon className={classes.iconButton} />
   </IconButton>
 </paper>
    );
 }