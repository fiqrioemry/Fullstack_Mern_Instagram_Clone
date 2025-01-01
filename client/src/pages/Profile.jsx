import {
  Bookmark,
  Camera,
  Grid2X2,
  Settings,
  SquareUserRound,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPosts from "../components/UserPosts";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();

  return (
    <div className="flex justify-center h-[200vh]">
      <div className="w-full max-w-4xl py-24 md:py-12 px-2">
        {/* head */}
        <div className="flex h-60">
          <div className="w-40 md:w-60 flex justify-center">
            <div className="h-24 w-24 md:w-36 md:h-36 flex items-center justify-center border rounded-full">
              <image className="object-contain w-full h-full" src="" alt="" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 max-w-2xl w-full">
              <div>
                <h1 className="text-xl font-semibold">Ahmadfiqri</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="custom" size="md">
                  Follow
                </Button>
                <Button variant="primary" size="md">
                  Message
                </Button>
                <Button variant="primary" size="md">
                  <Settings />
                </Button>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center gap-8">
                <Button size="md">0 Post</Button>
                <Button size="md">3 Followers</Button>
                <Button size="md">10 Followings</Button>
              </div>
            </div>
            <div className="flex">
              this is a bio of mine. feel free to read my awesome description
            </div>
          </div>
        </div>

        {/* post */}
        <div>
          <Tabs defaultValue="post">
            <TabsList className="w-full">
              <TabsTrigger value="post">
                <Grid2X2 /> <span>Post</span>
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Bookmark /> <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="tags">
                <SquareUserRound /> <span>Tagged</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="post">
              <UserPosts username={username} />
            </TabsContent>

            <TabsContent value="saved">
              <div className="text-center space-y-3 py-12">
                <div className="flex items-center justify-center">
                  <div className="p-4  rounded-full border">
                    <Bookmark size={50} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">SAVED</h1>
                </div>
                <div className="flex justify-center">
                  <div className="max-w-96 text-sm">
                    Save photos and videos that you want to see again. No one is
                    notified, and only you can see what you have saved.
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tags">
              <div className="text-center space-y-3 py-12">
                <div className="flex items-center justify-center">
                  <div className="p-4  rounded-full border">
                    <Camera size={50} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">PHOTOS OF YOU</h1>
                </div>
                <div className="flex justify-center">
                  <div className="max-w-96 text-sm">
                    When you share photos, they will appear on your profile.
                  </div>
                </div>
              </div>

              {/* <div className="grid grid-cols-3 gap-2">
                <div className="h-40 md:h-60 bg-red-500"></div>
                <div className="h-40 md:h-60 bg-red-500"></div>
                <div className="h-40 md:h-60 bg-red-500"></div>
              </div> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
