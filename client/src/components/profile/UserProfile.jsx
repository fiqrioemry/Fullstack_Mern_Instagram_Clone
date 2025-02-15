/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const UserProfile = ({ profile }) => {
  const location = useLocation();
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex items-center gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <h3>{profile.username}</h3>
            <div className="flex items-center gap-4">
              <button className="px-4 py-1 border rounded-md text-sm">
                Edit profile
              </button>
              <button className="px-4 py-1 border rounded-md text-sm">
                View archive
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4">
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
          <div>
            <p className="mt-2 font-medium">{profile.username}</p>
            <p className="text-gray-500">{profile.fullname}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
