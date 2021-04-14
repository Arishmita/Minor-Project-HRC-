import React from 'react';
import GridHeader from './GridHeader';
import Header from './Header';
import Table from './Table';
const Main=()=>{
    
    return(
        <React.Fragment>
           <Header />
           <GridHeader />
           <Table />
           
           
        </React.Fragment>
    );
}

export default Main;