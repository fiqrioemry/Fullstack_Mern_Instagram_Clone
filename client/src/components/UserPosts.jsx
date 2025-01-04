/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { Camera, HeartIcon, MessageCircle } from "lucide-react";
import Galleries from "./posts/Galleries";
import { useLocation, useNavigate } from "react-router-dom";
import { useProvider } from "../context/GlobalProvider";

const UserPosts = ({ posts }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setMount } = useProvider();

  const handleNavigate = (postId) => {
    setMount(true);
    navigate(`/p/${postId}`, { state: { background: location } });
  };

  return (
    <div>
      {!posts ? (
        <div className="h-[50vh] flex items-center justify-center text-3xl font-semibold">
          Loading data...
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center space-y-3 py-12">
          <div className="flex items-center justify-center">
            <div className="p-4  rounded-full border">
              <Camera size={50} />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">SHARE PHOTOS</h1>
          </div>
          <div className="flex justify-center">
            <div className="max-w-96 text-sm">
              When you share photos, they will appear on your profile.
            </div>
          </div>
          <div>
            <Button variant="custom" size="md">
              Share a photos
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {posts.map((post) => (
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
