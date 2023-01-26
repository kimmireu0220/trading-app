import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="centered column">
      <p>{text}</p>
      <Link to="/trading">Back to Home</Link>
    </div>
  );
};

export default NotFound;
