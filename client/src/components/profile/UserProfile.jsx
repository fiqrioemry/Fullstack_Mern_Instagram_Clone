/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const UserProfile = ({ profile }) => {
  const location = useLocation();
  const { follow } = useUserStore();

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
                <h3>{profile.username}</h3>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={follow}
                    variant={profile.isFollowing ? "following" : "follow"}
                  >
                    {profile.isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="following">Message</Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-start items-center gap-6 mt-4">
                <span>{profile.posts} Posts</span>
                <Link
                  className="hover-btn"
                  to={`/${profile.username}/followings`}
                  state={{ background: location }}
                >
                  {profile.followings} Followings
                </Link>
                <Link
                  className="hover-btn"
                  to={`/${profile.username}/followers`}
                  state={{ background: location }}
                >
                  {profile.followers} Followers
                </Link>
              </div>
              <div className="space-y-2 mt-4 text-justify">
                <span className="text-gray-500">{profile.fullname}</span>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Tempore sapiente commodi est deserunt quasi iusto, molestiae,
                  fuga labore optio qui ipsam ducimus accusamus eum minima.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
