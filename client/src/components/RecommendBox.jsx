/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../store/useUserStore";
import { useProvider } from "../context/GlobalProvider";
import RecommendSkeleton from "./skeleton/RecommendSkeleton";

const RecommendBox = ({ message }) => {
  const { userData } = useProvider();
  const [followingIds, setFollowingIds] = useState([]);
  const {
    followings,
    followUser,
    recommend,
    getFollowings,
    getFollowRecommend,
  } = useUserStore();

  const handleFollow = (e) => {
    followUser(e.target.value);
  };

  useEffect(() => {
    getFollowings(userData.userId), getFollowRecommend();
  }, []);

  useEffect(() => {
    if (followings.length !== 0) {
      setFollowingIds(followings.map((follow) => follow.id));
    }
  }, [followings]);

  if (recommend.length === 0) return <RecommendSkeleton />;
  console.log(recommend);
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl">
          {message ? message : "Follow Recommendation"}
        </h2>
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
                {followingIds.includes(user.userId) ? "follow" : "unfollow"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendBox;
