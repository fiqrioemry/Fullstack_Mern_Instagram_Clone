/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import PostOptions from "@/components/modal/PostOptions";

const PostAuthor = ({ data }) => {
  return (
    <div className="p-2 mt-2 mb-2">
      <div className="flex-between">
        <div className="flex items-center gap-2">
          <Avatar avatar={data.avatar} />
          <div className="flex items-center gap-2">
            <Link className="btn-secondary" to={`/${data.username}`}>
              {data.username}
            </Link>
            {!data.isFollow && <button className="btn-accent"> Follow</button>}
          </div>
        </div>

        <button className="btn-secondary">
          <PostOptions data={data} />
        </button>
      </div>
    </div>
  );
};

export default PostAuthor;
