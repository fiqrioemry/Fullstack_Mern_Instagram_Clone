/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { Camera, HeartIcon, MessageCircle } from "lucide-react";
import Galleries from "./posts/Galleries";
import { useLocation, useNavigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";
import { useUserStore } from "../store/useUserStore";

const UserPosts = () => {
  const { userData } = useProvider();
  const { userPosts, userProfile } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { setMount, setBackground } = useProvider();

  const handleNavigate = (postId) => {
    setMount(true);
    setBackground(location);
    navigate(`/p/${postId}`, { state: { background: location } });
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
              <div className="absolute flex items-center justify-center top-0 bottom-0 right-0 left-0 opacity-0 hover:opacity-100 bg-black/50 duration-300 transition-all z-10 cursor-pointer">
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
