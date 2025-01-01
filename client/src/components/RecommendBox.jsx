/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore";

const RecommendBox = ({ recommend, message = null }) => {
  const [followingIds, setFollowingIds] = useState([]);
  const { followUser, followings } = useUserStore();

  const handleFollow = (e) => {
    followUser(e.target.value);
  };

  // const handleUnfollow = (e) => {
  //   unfollowUser(e.target.value);
  // };

  useEffect(() => {
    setFollowingIds(followings.map((item) => item.id));
  }, [followings]);

  return (
    <div className="space-y-2">
      <div className="py-4 text-center">
        <h2 className="text-xl font-semibold">{message}</h2>
      </div>
      {recommend.map((user, index) => (
        <div className="bg-secondary px-4 py-2 rounded-md" key={index}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-full bg-white">
                <img src={user.avatar} alt="avatar" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">{user.username}</div>
                <div className="font-normal">Suggested for you</div>
              </div>
            </div>
            <div>
              <Button
                onClick={handleFollow}
                value={user.userId}
                variant="custom"
                size="sm"
              >
                {followingIds.includes(user.userId) ? "unfollow" : "follow"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendBox;
