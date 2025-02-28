import { useEffect } from "react";

import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";
import UserPostsLoading from "@/components/skeleton/UserPostsLoading";
import PostsDisplay from "./posts/PostsDisplay";
import NoPostsDisplay from "./posts/NoPostsDisplay";

const UserPosts = () => {
  const { username } = useParams();
  const { profile } = useUserStore();
  const { posts, getUserPosts } = usePostStore();

  useEffect(() => {
    getUserPosts(username);
  }, [getUserPosts, username]);

  if (!posts) return <UserPostsLoading />;

  if (posts.length === 0) return <NoPostsDisplay profile={profile} />;

  return (
    <div className="pb-14 md:pb-8">
      <PostsDisplay posts={posts} />
    </div>
  );
};

export default UserPosts;
