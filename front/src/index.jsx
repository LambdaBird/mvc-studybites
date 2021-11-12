import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import './theme/main.less';
import './i18n';

import App from './App';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://3ebfa76b2f8846498a21cf4321ff4a6c@o1066809.ingest.sentry.io/6060937',
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
