import { Link, useLocation } from "react-router-dom";

const NoMorePosts = () => {
  const location = useLocation();

  const showButton = location.pathname === "/";
  return (
    <div className="mb-8">
      <div className="text-center text-muted">
        <p>You have reached the end</p>
        <p>No more post to show</p>
      </div>
      {showButton && (
        <Link to="/explore" className="btn btn-secondary">
          Follow User For More
        </Link>
      )}
    </div>
  );
};

export default NoMorePosts;
