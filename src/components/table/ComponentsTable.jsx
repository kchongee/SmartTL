import React,{useState,useEffect} from 'react';
import "./table.css";
import { DataGrid } from '@mui/x-data-grid';

export default function ComponentsTable({height="400px",cols,data}) {    

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'age', headerName: 'Age', type: 'number', width: 90},   
        { field: '..', headerName: '..', type: 'number', width: 90},                
    ];
      
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];    
    
      
    return (
        <div className="table" style={{height:height}}>                        
            <DataGrid
                rows={data}
                columns={cols}                
                // rowsPerPageOptions={[5]}
                // pageSize={5}
                // checkboxSelection                
                disableSelectionOnClick                 
                hideFooter
            />
        </div>       
    )
}
