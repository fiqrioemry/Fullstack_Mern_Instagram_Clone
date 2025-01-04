import NotFound from "./NotFound";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserTags from "../components/UserTags";
import UserSaved from "../components/UserSaved";
import UserPosts from "../components/UserPosts";
import UserProfile from "../components/UserProfile";
import { useUserStore } from "../store/useUserStore";
import UserFollowers from "../components/modal/UserFollowers";
import { Bookmark, Grid2X2, SquareUserRound } from "lucide-react";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { username } = useParams();
  const { userData } = useAuthStore();
  const { userProfile, getUserProfile, getUserPosts, userPosts } =
    useUserStore();

  useEffect(() => {
    getUserProfile(username);
  }, [username, getUserProfile]);

  useEffect(() => {
    if (userProfile && userProfile.userId) {
      getUserPosts(userProfile.userId);
    }
  }, [userProfile, getUserPosts]);

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
            <UserProfile user={userProfile} data={userData} />
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
                <UserSaved />
              </TabsContent>

              <TabsContent value="tags">
                <UserTags />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
