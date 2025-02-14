/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "@/components/post/Avatar";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../../store/useUserStore";
import { Loader } from "lucide-react";

const FollowCard = ({ user }) => {
  const { follow, unfollow, loading } = useUserStore();

  const handleFollow = (userId) => {
    follow(userId);
  };

  const handleUnfollow = (userId) => {
    unfollow(userId);
  };

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

      {user.isFollow ? (
        <Button onClick={() => handleFollow(user.userId)} variant="follow">
          {loading[user.userId] ? (
            <Loader className="animate-spin" />
          ) : (
            "Follow"
          )}
        </Button>
      ) : (
        <Button onClick={() => handleUnfollow(user.userId)} variant="unfollow">
          {loading[user.userId] ? (
            <Loader className="animate-spin" />
          ) : (
            "Unfollow"
          )}
        </Button>
      )}
    </div>
  );
};

export default FollowCard;
