import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css"; 

export default function NotFoundPage() {


  return (

    <div className="not-found-container">
      <div className="flex gap-2">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
      </div>
      <Link to="/" className="home-button">
      ⮘ &nbsp;Go Back
      </Link>
    </div>
  );
}
