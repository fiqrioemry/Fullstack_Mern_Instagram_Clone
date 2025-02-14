/* eslint-disable react/prop-types */
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const UserProfile = ({ user }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center py-10">
      <div className="flex items-center gap-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info */}
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <h3>{user.username}</h3>
            <div className="flex items-center gap-4">
              <button className="px-4 py-1 border rounded-md text-sm">
                Edit profile
              </button>
              <button className="px-4 py-1 border rounded-md text-sm">
                View archive
              </button>
              <button className="text-lg">
                <Settings />
              </button>
            </div>
          </div>
          <div className="flex gap-6 mt-2">
            <span>{user.posts} Posts</span>
            <Link
              className="text-xs md:text-sm"
              to={`/${user.username}/followings`}
              state={{ background: location }}
            >
              Followings
            </Link>
            <Link
              className="text-xs md:text-sm"
              to={`/${user.username}/followers`}
              state={{ background: location }}
            >
              Followers
            </Link>
          </div>
          <p className="mt-2 font-medium">{user.username}</p>
          <p className="text-gray-500">{user.fullname}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
