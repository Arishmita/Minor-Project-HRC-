import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { pxToRem, pxToVw, pxToVh } from '../utils/theme';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Action from "./Action";
import Grid from '@material-ui/core/Grid';

const headCells = [
  { id: 'name_customer', label: 'Customer Name',numeric: false, disablePadding: true },
  { id: 'cust_number', label: 'Customer#',numeric: true, disablePadding: false },
  { id: 'doc_id', label: 'Bill#',numeric: true, disablePadding: false },
  { id: 'bill_amount', label: 'Bill Amount',numeric: true, disablePadding: false },
  { id: 'due_date', label: 'Due Date',numeric: false, disablePadding: false },
  { id: 'predicted_payment_date', label: 'Predicted Payment Date',numeric: false, disablePadding: false },
  { id: 'aging_bucket', label: 'Predicted Aging Bucket',numeric: false, disablePadding: false },
  { id: 'notes', label: 'Notes',numeric: false, disablePadding: false },
];

function EnhancedTableHead(props) {
 const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
 console.log(orderBy);
 const createSortHandler = (property) => (event) => {
 onRequestSort(event, property);
};

return (
<TableHead>
 <TableRow>
<StyledTableCell padding="checkbox">
     <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
        inputProps={{ 'aria-label': 'select all' }}
    />
    </StyledTableCell>
    {headCells.map((headCells) => (
     <StyledTableCell
     key={headCells.id }
        padding={headCells.disablePadding ? 'none' : 'default'}
        sortDirection={orderBy === headCells.id ? order : false}
    >
    <TableSortLabel
        active={orderBy === headCells.id}
            onClick={createSortHandler(headCells.id)}
        >
        {headCells.label}
            {orderBy === headCells.id ? (
         <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </span>
              ) : null}
     </TableSortLabel>
    </StyledTableCell>
    ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#273D49CC",
    color: "#97A1A9",
    borderBottomColor:"black",
    fontSize: 12,
  },
  body: {
  fontSize: 12,
  color: "#FFFFFF",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#273D49CC",
      heigth: pxToRem(6),
     },
      "&:nth-of-type(even)": {
        backgroundColor: "#283A46",
        height: pxToRem(6),
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#273D49CC',
     top:pxToRem(100),
    
    width: '98%',
      marginLeft: "auto",
    marginRight: "auto",
    border:"none",
},
container: {
 maxHeight: 410,
 },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  grid:{
    backgroundColor:'#39495E',
    height:'81.7vh'
},
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function ascendingComparator(a, b, orderBy) {
  if (b[orderBy] > a[orderBy]) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => ascendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function TableData() {
  const classes = useStyles();
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);
  const fetchData = () => {
    axios.get(
        
        `http://localhost:8080/1806199/data.do?count=${pageCount}&limit=10`,
        )
      .then((response) => {
        setResponseData([...responseData, ...response.data]);
        isNextFunc(true)
        console.log(responseData);
      })
      
      .catch((error) => {
        console.log(error);
      });
  };
  function fetchMoreData() {
    setCount(pageCount + 1);
    fetchData();
  }

  useEffect( () =>{
    isNextFunc(true);
    fetchMoreData();
  },[]);

  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('bill_amount');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = responseData.map((n) => n.doc_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, doc_id) => {
    const selectedIndex = selected.indexOf(doc_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, doc_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
const isSelected = (doc_id) => selected.indexOf(doc_id) !== -1;
const emptyRows = rowsPerPage - Math.min(rowsPerPage, responseData.length - page * rowsPerPage);
return (
    <Grid container spacing={0} className={classes.grid}>
    <Grid item xs={12}>
    <Paper className={classes.table}>
    <Action selected={selected} responseData={responseData}/>
     <InfiniteScroll
        dataLength={responseData.length}
        next={fetchMoreData}
        hasMore={isNext}
        loader={
          <div
          style={{ height: "80%", paddingLeft: "40%", overflow: "hidden" }}
        > 
     <CircularProgress /></div>
      } useWindow={false}
      scrollableTarget="scrollable"
      ><TableContainer className={classes.container} id="scrollable">
      <Table 
        stickyHeader
        aria-labelledby="tableTitle"
        aria-label="enhanced table">
        <EnhancedTableHead
            classes={classes}
             numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            numSelected={selected.length}
            order={order}
         orderBy={orderBy}
        onRequestSort={handleRequestSort}
        rowCount={responseData.length}
     />
    <TableBody>
              {
                stableSort(responseData, getComparator(order, orderBy))

                    .map((row, index) => {
                  const isItemSelected = isSelected(row.doc_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.doc_id)}
                      value={row.doc_id}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox" style={{borderBottom:'none'}}>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th"  scope="row" padding="none" style={{borderBottom:'none'}}>
                        {row.name_customer}
                      </StyledTableCell>
                      <StyledTableCell align="right" style={{borderBottom:'none'}}>{row.cust_number}</StyledTableCell>
                      <StyledTableCell align="right" style={{borderBottom:'none'}}>{row.doc_id}</StyledTableCell>
                      <StyledTableCell align="right" style={{borderBottom:'none'}}>{row.total_open_amount}</StyledTableCell>
                      
                      <StyledTableCell align="right" style={{borderBottom:'none'}}>{row.due_in_date}</StyledTableCell>
                      <StyledTableCell align="right" style={{borderBottom:'none'}}>--</StyledTableCell>
                      <StyledTableCell align="right" style={{borderBottom:'none'}}>--</StyledTableCell>
                      <StyledTableCell align="right" style={{borderBottom:'none'}}>{row.notes}</StyledTableCell>
                    </StyledTableRow>
                  );
                  })}
         </TableBody>
       </Table>
        </TableContainer>
      </InfiniteScroll>
     </Paper>
    </Grid>
    </Grid>
  );
}
export default TableData;
