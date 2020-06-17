import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import format from 'string-format';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

format.extend(String.prototype, null);

const theme = createMuiTheme({
  typography: {
    fontSize: 14,
  },
  palette: {
    type: 'dark',
    primary: {
      light: "#f381a7",
      main: "#f06292",
      dark: "#a84466",
      contrastText: "#fff"
    }
  }
});

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
