/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";

const UserProfile = ({ profile }) => {
  const location = useLocation();
  const { toggleFollow } = useUserStore();

  const handleFollow = (followingId) => {
    toggleFollow(followingId);
  };
  return (
    <div className="py-10">
      <div className="flex justify-center">
        <div className="flex flex-col items-center max-w-2xl">
          <div className="flex md:flex-row flex-col items-center md:gap-8 gap-2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 flex-shrink-0">
              <img
                src={profile.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex justify-center md:justify-start w-full md:w-1/3">
                  <h3>{profile.username}</h3>
                </div>
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <Button
                    className="w-full"
                    onClick={() => handleFollow(profile.userId)}
                    variant={profile.isFollowing ? "secondary" : "accent"}
                  >
                    {profile.isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button className="w-full" variant="secondary">
                    Message
                  </Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-6 mt-4">
                <span>{profile.posts} Posts</span>
                <Link
                  className="btn-secondary"
                  to={`/${profile.username}/followings`}
                  state={{ background: location }}
                >
                  {profile.followings} Followings
                </Link>
                <Link
                  className="btn-secondary"
                  to={`/${profile.username}/followers`}
                  state={{ background: location }}
                >
                  {profile.followers} Followers
                </Link>
              </div>
              <div className="space-y-2 mt-4 text-justify">
                <span className="text-muted-foreground">
                  {profile.fullname}
                </span>
                <p>{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
