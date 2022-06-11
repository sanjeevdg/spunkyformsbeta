import * as React from 'react';
import {useState,useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MyDrawer from './MyDrawer';
import MyAppbar from './MyAppbar';
import Copyright from './Copyright';
import Divider from '@mui/material/Divider';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';

import { useNavigate } from "react-router-dom";



export default function MyForms(props) {

const mdTheme = createTheme();
let navigate = useNavigate();

const [loaded,setLoaded] = useState(false);
const [myforms, setMyForms] = useState(null);

const [hoveredRow, setHoveredRow] = React.useState(null);


const callDelete = (id) => {


alert('delete pressed on id='+id);

}

const callEdit = (id) => {


alert('edit pressed on id='+id);

navigate('/edit-form',{state:{"formid":id}});


}




  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'formname',
    headerName: 'Form name',
    width: 250,
    editable: true,
  },
  {
    field: 'displayname',
    headerName: 'Display name',
    width: 300,
    editable: true,
  },
  {
  field: "actions",
  headerName: "",
  width: 120,
  sortable: false,
  disableColumnMenu: true,
  renderCell: (params) => {
    if (hoveredRow === params.id) {
      return (
        <Box
          sx={{
            backgroundColor: "whitesmoke",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IconButton onClick={() => {callEdit(params.id)}}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => {callDelete(params.id)}}>
            <DeleteIcon />
          </IconButton>
        </Box>
      );
    } else return null;
  }
}
];


useEffect(()=> {

async function getFormsList() {

  

try{
  fetch(`https://glossary-of-terms.herokuapp.com/getFormsList`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      }   
}).then((resp) => {
  resp.json().then((data) => {setMyForms(data.myforms);setLoaded(true);})
  


});
} catch(e) { alert('caught err'+e.message); }



}

getFormsList();


}, [])







  return (
 		
<ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <MyAppbar hdrtit="All Forms List"/>

        <MyDrawer />


 <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Form List
        </Typography>
        <Divider/>

<div style={{ height: 400, width: '100%',marginTop:10 }}>

{loaded?
   <DataGrid
   initialState={{ pinnedColumns: { right: ["actions"] } }}
   componentsProps={{
  row: {
    onMouseEnter: onMouseEnterRow,
    onMouseLeave: onMouseLeaveRow
  }
}}
        rows={myforms}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
   sx={{
    "& .MuiDataGrid-iconSeparator": {
      display: "none"
    },
    "& .MuiDataGrid-pinnedColumnHeaders": {
      boxShadow: "none",
      backgroundColor: "transparent"
    },
    "& .MuiDataGrid-pinnedColumns": {
      boxShadow: "none",
      backgroundColor: "transparent",
      "& .MuiDataGrid-cell": {
        padding: 0
      }
    },
    "& .MuiDataGrid-row": {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "whitesmoke"
      },
      "&:first-of-type": {
        borderTop: "1px solid rgba(224, 224, 224, 1)"
      }
    },
    "& .MuiDataGrid-cell:focus": {
      outline: "none"
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none"
    }
  }}     
      />
:<CircularProgress color="success" />}

</div>

        <Copyright style={{marginTop:400}}/>
      </Box>
    </Container>

</Box>
    </ThemeProvider>

  );
}
