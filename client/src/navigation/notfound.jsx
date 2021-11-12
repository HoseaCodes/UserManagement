import React from "react";
import {Link} from 'react-router-dom'

export const NotFound = () => {
  return (
    <>
      {/* Page Not Found! */}
      <Link to="/">Home</Link>
      <h2>404: page not found!</h2>
    </>
  );
}
