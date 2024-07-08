import * as React from 'react';
import Table from '@mui/joy/Table';
import { Button } from '@mui/joy';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function TableColumnWidth({usersData,onDelete,onUpdate,setEditingData}) {
    function handelUpdate(row){
      // onUpdate(row)
      setEditingData(row)
    }
  return (
    <Table
    sx={{maxWidth:'1500px',margin:'auto', '& tr > *:not(:first-child)': { textAlign: 'left' } ,'& thead th:nth-child(3)': { width: '40%' },'& thead th:nth-child(1)': { width: '5%' }}}
    //  sx={{ '& thead th:nth-child(1)': { width: '40%' } }}
     >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>EDIT</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody>
        {usersData.map((row,i) => (
          <tr key={i}>
            <td>{i}</td>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>
                <Button size="md" variant='soft' color="primary" onClick={()=>handelUpdate(row)} >
                   Update
                </Button>
            </td>
            <td>
                <Button size="md" variant='soft' color="danger" onClick={()=>onDelete(row)} >
                   Delete
                </Button>
            </td>
           
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
