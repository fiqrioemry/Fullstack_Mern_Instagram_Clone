import { Link, useLocation } from "react-router-dom";

const Testing = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-center h-screen">
      <Link to={`/testing/p/1`} state={{ background: location }}>
        CLICK
      </Link>
    </div>
  );
};

export default Testing;
