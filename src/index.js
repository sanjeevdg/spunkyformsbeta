import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import MyForms from './MyForms';
import CreateNewForm from './CreateNewForm';
import EditForm from './EditForm';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
     <BrowserRouter>
    <Routes> 
      
        <Route exact path="/" element={<App/>}/>
        <Route exact path="/create-new-form" element={<CreateNewForm /> }/>
        <Route exact path="/my-forms" element={<MyForms /> }/>
        <Route exact path="/edit-form" element={<EditForm /> }/>
        
      </Routes>
     </BrowserRouter>
  </ThemeProvider>,
);
