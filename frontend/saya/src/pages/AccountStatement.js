import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


function AccountStatement(props) {
    const columns = [
        {
            field: 'updateTs',
            headerName: 'DATE',
            width: 110,
            type:Date,
            sortable: true,
          },
        
        {
          field: 'type',
          headerName: 'TYPE',
          width: 100,
          sortable:false
        },
        {
          field: 'amount',
          headerName: 'Amount',
          width: 100,
          type: 'number',
          sortable: true,
        },
        {
          field: 'transcation_details',
          headerName: 'DETAILS',
          width: 200,
          editable: false,
          sortable:false
        },
        {
          field: 'closing_balance',
          headerName: 'CLOSING BALANCE',
          type: 'number',
          sortable: false,
          width: 200
        },
        { field: '_id', headerName: 'TRANSCATION_ID', width: 150 },
      ];
      

const formatData = ()=>{
    let statement_list = [];
    props.statements.map(stm => (
        statement_list.push({...stm, ...{id:stm._id}})
      ))
    return statement_list;
}
  return (
    <div className = "statement_list">
        {(props.statements.length>0)?
         <Box sx={{ height: 400, width: '100%' }}>
         <DataGrid
             rows={formatData()}
             columns={columns}
             pageSize={5}
             rowsPerPageOptions={[100]}
         />
        </Box>
        
        
        :<p>No Data Available</p>}
       
    </div>
  )
}

export default AccountStatement