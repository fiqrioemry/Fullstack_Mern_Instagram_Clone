import { Button } from "./ui/button";
import Galleries from "./post/Galleries";
import { useUserStore } from "../store/useUserStore";
import { useProvider } from "../context/GlobalProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, HeartIcon, MessageCircle } from "lucide-react";

const UserPosts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userPosts, userProfile } = useUserStore();
  const { setMount, userData, setBackground } = useProvider();

  const handleNavigate = (postId) => {
    setMount(true);
    setBackground(location);
    navigate(`/p/${postId}`);
  };

  return (
    <div>
      {!userPosts ? (
        <div className="h-[50vh] flex items-center justify-center text-3xl font-semibold">
          Loading data...
        </div>
      ) : userPosts.length === 0 ? (
        <div className="text-center space-y-3 py-12">
          <div className="flex items-center justify-center">
            <div className="p-4  rounded-full border">
              <Camera size={50} />
            </div>
          </div>
          {userProfile.userId === userData.userId ? (
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
        <div className="grid grid-cols-3 gap-2">
          {userPosts.map((post) => (
            <div
              onClick={() => handleNavigate(post.postId)}
              key={post.postId}
              className="relative"
            >
              <div className="post_card">
                <div className="flex items-center gap-x-6">
                  <div className="flex gap-x-2">
                    {post.commentCount}
                    <HeartIcon />
                  </div>
                  <div className="flex gap-x-2">
                    {post.commentCount}
                    <MessageCircle />
                  </div>
                </div>
              </div>
              <Galleries images={post.images} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
