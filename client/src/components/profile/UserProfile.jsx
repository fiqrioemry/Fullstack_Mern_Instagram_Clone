/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useChatStore } from "@/store/useChatStore";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserProfile = ({ profile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleFollow } = useUserStore();
  const { setSelectedUser } = useChatStore();

  const handleFollow = (followingId) => {
    toggleFollow(followingId);
  };

  const handleNavigate = () => {
    setSelectedUser(profile);
    navigate("/message");
  };
  return (
    <div className="flex justify-center py-10 md:py-8">
      <div className="flex flex-col items-center ">
        <div className=" flex md:flex-row flex-col items-center md:gap-8 gap-2">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 flex-shrink-0">
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-full h-full object-cover flex-shrink-0"
            />
          </div>

          <div>
            {profile.isMyProfile ? (
              <div className="flex flex-col md:flex-row items-center md:gap-12 gap-4">
                <div className="flex justify-center md:justify-start w-full md:w-1/3">
                  <h3>{profile.username}</h3>
                </div>

                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <Link to="/settings" className="btn-selection">
                    Edit Profile
                  </Link>
                  <Link to="" className="btn-selection">
                    View Archive
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center md:gap-20 gap-4">
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
                  <Button
                    onClick={handleNavigate}
                    className="w-full"
                    variant="secondary"
                  >
                    Message
                  </Button>
                </div>
              </div>
            )}

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
              <span className="text-muted-foreground">{profile.fullname}</span>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
