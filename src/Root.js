import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header';
import App from './containers/App';

function Root() {
  return (
    <HashRouter>
      <Header />
      <App />
    </HashRouter>
  );
}

export default Root;
