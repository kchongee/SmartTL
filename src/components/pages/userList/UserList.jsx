import React,{useState,useEffect} from 'react';
import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';

export default function UserList() {

    const [data,setData] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
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

    useEffect(() => {        
        const url = "https://api.adviceslip.com/advice";

        setData(rows)

        // const fetchData = async () => {
        //   try {
        //     const response = await fetch(url);
        //     const json = await response.json();
        //     console.log(json);
        //   } catch (error) {
        //     console.log("error", error);
        //   }
        // };
    
        // fetchData();
    }, [])
    
      
    return (
        <div className="userList">
            <DataGrid
                rows={data}
                columns={columns}                
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick 
                hideFooterPagination
            />
        </div>
    )
}

