import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './StyleSheets/Common.scss';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import format from 'string-format';

format.extend(String.prototype, null);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
