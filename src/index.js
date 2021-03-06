import React from 'react';
import ReactDOM from 'react-dom';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="bartender-dev.us.auth0.com"
      clientId="fLIo7Cc7vP5RRdYiF98fDW9PSRSObXkc"
      redirectUri={window.location.origin}
    >
      <ReactNotification />
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
