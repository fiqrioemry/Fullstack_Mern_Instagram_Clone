/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "@/components/post/Avatar";
import { Button } from "@/components/ui/button";

const FollowCard = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <Avatar avatar={user.avatar} />
        <div>
          <Link to={`/${user.username}`} className="font-medium text-gray-800">
            {user.username}
          </Link>
          <p className="text-gray-500 text-sm">{user.fullname}</p>
        </div>
      </div>

      {user.isFollowedByMe ? (
        <Button variant="follow">Follow</Button>
      ) : (
        <Button variant="unfollow">unfollow</Button>
      )}
    </div>
  );
};

export default FollowCard;
