/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import Galleries from "./posts/Galleries";

const UserPosts = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      {!posts ? (
        <div className="h-[50vh[] flex items-center justify-center text-3xl font-semibold">
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
          {posts.map((post) => {
            console.log(post.PostGalleries);
            return (
              <div className="h-40 md:h-60" key={post.id}>
                <Galleries images={post.PostGalleries} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
