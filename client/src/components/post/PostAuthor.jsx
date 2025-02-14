/* eslint-disable react/prop-types */
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";

const PostAuthor = ({ data }) => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center space-x-3">
        <Avatar avatar={data.avatar} />
        <div className="flex items-center space-x-1">
          <Link
            to={`/${data.username}`}
            className="font-semibold text-gray-900 text-sm"
          >
            {data.username}
          </Link>
          <button className="text-blue-500 text-sm font-medium">
            • Follow
          </button>
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

export default PostAuthor;
