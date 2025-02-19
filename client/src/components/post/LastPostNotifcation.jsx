import { Link } from "react-router-dom";

const LastPostNotifcation = () => {
  return (
    <div>
      <div>
        <div
          className="text-center text-muted-foreground
        /80 mt-4"
        >
          <p>You have reached the end</p>
          <p>No more post to show</p>
        </div>

        <Link to="/explore" className="btn btn-secondary">
          Discover People to Follow
        </Link>
      </div>
    </div>
  );
};

export default LastPostNotifcation;
