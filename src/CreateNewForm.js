import * as React from 'react';
import {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MyDrawer from './MyDrawer';
import MyAppbar from './MyAppbar';
import Copyright from './Copyright';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';






export default function CreateNewForm() {

const mdTheme = createTheme();

const [frmnm, setFrmNm] = useState('');
const [dspnm, setDspNm] = useState('');
const [isLoading,setIsLoading] = useState(false);
const [snkb, setSnkb] = useState(false);
let navigate = useNavigate();

async function CreateSpunkyForm() {


  
const body = {
   "formname": frmnm, 
   "displayname": dspnm, 
};



var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');
// curl -d "formname=test1&displayname=est1" -X POST https://710d-2409-4060-1e-b158-1d34-fc03-ff6d-1ef2.ngrok.io/createNewForm

try{
  fetch(`https://glossary-of-terms.herokuapp.com/debugEndpoint`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {setIsLoading(false);alert(JSON.stringify(data));setSnkb(true);navigate('/my-forms');})

  

})
} catch(e) { alert('caught err'+e.message); }



};





  return (
 		
<ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <MyAppbar hdrtit="Create a new form"/>

        <MyDrawer />


 <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 4, marginTop:7,alignItems:'center',justifyContent:'center' }} >



<Card variant="outlined">
  <CardContent>
 

        <Typography variant="h5" component="h2" gutterBottom>
          Create a new form
        </Typography>
        <Divider/>

{/*<div style={{width:'90%',marginTop:30,marginLeft:20}}>*/}



   <TextField
          id="outlined-helperText"
          label="Please fill in a form name"
          onChange={(e) => setFrmNm(e.target.value)}
          defaultValue={frmnm}
          helperText="no spaces or special characters"
          variant="standard"
          style={{width:300}}
        />
        <div style={{height:25}}/>
 <TextField
          id="standard-helperText"
          onChange={(e) => setDspNm(e.target.value)}
          label="Please fill in display name"
          defaultValue={dspnm}
          helperText="All characters allowed"
          variant="standard"
          style={{width:300}}
        />
           {/*<div style={{height:30}}/> */}

     

 
  </CardContent>
  <CardActions style={{alignSelf:'space-between'}}>
  <Button style={{marginLeft:100,marginTop:20,alignSelf:'flex-end'}} onClick={() => {setIsLoading(true);CreateSpunkyForm();}} variant="outlined">Create Form {isLoading && <CircularProgress color="success" />}</Button>
  </CardActions>
  </Card>
{/* </div> */}

<Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        open={snkb}
        autoHideDuration={5000}
        onClose={()=> setSnkb(false)}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={()=> setSnkb(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
       <Alert onClose={() => setSnkb(false)} severity="success" sx={{ width: '100%' }}>
Spunky form creation success!
        </Alert>
        </Snackbar>

        <Copyright style={{marginTop:400}}/>
      </Box>
    </Container>

</Box>
    </ThemeProvider>

  );
}
