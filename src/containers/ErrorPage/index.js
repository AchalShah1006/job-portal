import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage({ statusCode, message }) {
  return (
    <div>
      <h1>{`${statusCode && statusCode} Page Not Found`}</h1>
      <span>{message}</span>
      <span>
        Redirect to<Link to="/"> Home</Link>
      </span>
    </div>
  );
}

export default ErrorPage;
