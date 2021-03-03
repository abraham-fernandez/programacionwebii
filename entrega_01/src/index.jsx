import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App/App';
import './index.css'
import { SnackbarProvider } from 'notistack';


ReactDom.render(<SnackbarProvider anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} maxSnack={3}>
    <App /></SnackbarProvider>, document.getElementById("root"))