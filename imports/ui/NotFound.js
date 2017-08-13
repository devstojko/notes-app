import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="boxed-view" >
      <div className="boxed-view__box" >
        <h1>Page Not Found</h1>
        <p>Requested page not found.</p>
        <Link to="/" >RETURN HOME</Link>
      </div>
    </div>
  );
}