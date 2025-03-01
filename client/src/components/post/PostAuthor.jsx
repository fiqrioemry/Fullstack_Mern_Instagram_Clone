/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { useUserStore } from "@/store/useUserStore";
import { usePostStore } from "@/store/usePostStore";
import { useAuthStore } from "@/store/useAuthStore";
import PostOptions from "@/components/modal/PostOptions";

const PostAuthor = ({ data }) => {
  const { user } = useAuthStore();
  const { toggleFollow } = useUserStore();
  const { updatePostsFollowStatus } = usePostStore();

  const handleFollow = useCallback(() => {
    updatePostsFollowStatus(data.userId);
    toggleFollow(data.userId);
  }, [toggleFollow, updatePostsFollowStatus, data.userId]);

  return (
    <div className="p-2 mt-2 mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar avatar={data.avatar} />
          <div className="flex items-center gap-2">
            <Link className="btn-secondary" to={`/${data.username}`}>
              {data.username}
            </Link>

            {data.userId !== user.userId && !data.isFollow && (
              <button onClick={handleFollow} className="btn-accent">
                Follow
              </button>
            )}
          </div>
        </div>

        <PostOptions data={data} />
      </div>
    </div>
  );
};

export default PostAuthor;
