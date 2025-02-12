/* eslint-disable react/prop-types */
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";

const Author = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center space-x-3">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-full border">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full rounded-full flex-shrink-0"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <Link
              to={`/${user.username}`}
              className="font-semibold text-gray-900 text-sm"
            >
              {user.username}
            </Link>
            <button className="text-blue-500 text-sm font-medium">
              • Follow
            </button>
          </div>
        </div>
      </div>

      <button className="text-gray-500 hover:text-gray-700">
        <span className="text-xl">
          <Ellipsis />
        </span>
      </button>
    </div>
  );
};

export default Author;
