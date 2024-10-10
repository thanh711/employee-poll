import React from 'react';
import './NotFound.css'; 
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Oops! It seems like you're lost in space. <br />
        The page you're looking for is out of this world!
      </p>
      <div className="not-found-astronaut">
        <img 
          src="/img/notfound.webp" 
          alt="not found" 
        />
      </div>
      <Link to={'/'}  className='go-home-button'>Take Me Home</Link>
    </div>
  );
};

export default NotFound;
