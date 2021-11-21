import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import App from './containers/App';

function Root() {
  return (
    <BrowserRouter>
      <Header />
      <App />
    </BrowserRouter>
  );
}

export default Root;
