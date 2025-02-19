import { useEffect } from "react";
import { Camera } from "lucide-react";
import MiniPost from "../post/MiniPost";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePostStore } from "@/store/usePostStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import UserPostsLoading from "@/components/skeleton/UserPostsLoading";

const UserPosts = () => {
  const { username } = useParams();
  const { user } = useAuthStore();
  const { profile } = useUserStore();
  const { posts, loading, getUserPosts } = usePostStore();

  useEffect(() => {
    getUserPosts(username);
  }, [getUserPosts, username]);

  return (
    <div className="mb-8">
      {loading ? (
        <UserPostsLoading />
      ) : posts.length === 0 ? (
        <div className="text-center space-y-3 py-12">
          <div className="flex items-center justify-center">
            <div className="p-4  rounded-full border">
              <Camera size={50} />
            </div>
          </div>
          {user.userId === profile.userId ? (
            <div className="space-y-6">
              <h2>SHARE PHOTOS</h2>
              <div className="text-sm">
                When you share photos, they will appear on your profile.
              </div>
              <Button variant="custom" size="md">
                Share a photos
              </Button>
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

export default UserPosts;
