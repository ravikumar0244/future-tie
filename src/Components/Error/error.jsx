import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

export const Error = ({ msg }) => {
  return (
    <div className="error-comp text-center">
      <h3 className="text-center my-2 p-4 text-danger">{msg}</h3>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  );
};
