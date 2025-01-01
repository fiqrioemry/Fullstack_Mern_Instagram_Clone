import { Camera } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import Galleries from "./posts/Galleries";

const UserPosts = ({ username }) => {
  const { userPosts, getUserPosts } = useUserStore();

  useEffect(() => {
    getUserPosts(username);
  }, []);
  return (
    <div>
      {userPosts.length === 0 ? (
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
          {userPosts.map((post) => {
            <div className="h-40 md:h-60">
              <Galleries images={post.images} />
            </div>;
          })}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
