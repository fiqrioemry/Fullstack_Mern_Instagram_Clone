import { useEffect } from "react";
import UserPosts from "../components/UserPosts";
import UserProfile from "../components/UserProfile";
import { useUserStore } from "../store/useUserStore";
import { useNavigate, useParams } from "react-router-dom";
import UserFollowers from "../components/modal/UserFollowers";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import { Bookmark, Camera, Grid2X2, SquareUserRound } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NotFound from "./NotFound";

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { userProfile, getUserProfile, getUserPosts, userPosts } =
    useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile(username);
        if (profile) {
          await getUserPosts(profile.userId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [username, getUserProfile, getUserPosts, navigate]);

  if (userProfile && userProfile.length === 0) return <NotFound />;

  return (
    <div className="flex justify-center">
      <UserFollowers />
      <div className="max-w-4xl w-full mt-14 mb-14">
        <div className="md:px-0 px-4 md:py-0 py-6">
          {/* user profile */}
          {!userProfile ? (
            <ProfileSkeleton />
          ) : (
            <UserProfile user={userProfile} />
          )}

          {/* post */}
          <div>
            <Tabs defaultValue="post">
              <TabsList className="w-full gap-x-20">
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
                <UserPosts posts={userPosts} />
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
                      Save photos and videos that you want to see again. No one
                      is notified, and only you can see what you have saved.
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
