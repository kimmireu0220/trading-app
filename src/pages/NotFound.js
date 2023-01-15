import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div className="centered column">
      <p>{props.text}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;
