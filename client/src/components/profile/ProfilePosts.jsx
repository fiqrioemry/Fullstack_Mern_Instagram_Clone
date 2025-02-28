import { useEffect } from "react";
import { Camera } from "lucide-react";
import MiniPost from "../post/MiniPost";
import { useParams } from "react-router-dom";
import { usePostStore } from "@/store/usePostStore";
import { useUserStore } from "@/store/useUserStore";
import UserPostsLoading from "@/components/skeleton/UserPostsLoading";

const ProfilePosts = () => {
  const { username } = useParams();
  const { profile } = useUserStore();
  const { posts, getUserPosts } = usePostStore();

  useEffect(() => {
    getUserPosts(username);
  }, [getUserPosts, username]);

  if (!posts) return <UserPostsLoading />;

  return (
    <div className="pb-12">
      {posts.length === 0 ? (
        <div className="text-center space-y-3 py-12">
          <div className="flex items-center justify-center">
            <div className="p-4 rounded-full border">
              <Camera size={50} />
            </div>
          </div>
          {profile.isMyProfile ? (
            <div className="space-y-6">
              <h2>SHARE PHOTOS</h2>
              <div className="text-sm">
                When you share photos, they will appear on your profile.
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2>No Photo yet</h2>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <MiniPost post={post} key={post.postId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
