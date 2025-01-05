import NotFound from "./NotFound";
import { useEffect } from "react";
import UserProfile from "../components/UserProfile";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import UserFollowers from "../components/modal/UserFollowers";
import { Bookmark, Grid2X2, SquareUserRound } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSkeleton from "../components/skeleton/ProfileSkeleton";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import UserFollowings from "../components/modal/UserFollowings";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const { userData } = useAuthStore();
  const { userProfile, getUserProfile, getUserPosts } = useUserStore();

  const currentTab = location.pathname.split("/").pop();

  useEffect(() => {
    getUserProfile(username);
  }, [username, getUserProfile]);

  useEffect(() => {
    if (userProfile && userProfile.userId) {
      getUserPosts(userProfile.userId);
    }
  }, [userProfile, getUserPosts]);

  if (userProfile && userProfile.length === 0) return <NotFound />;

  const handleTabChange = (tab) => {
    navigate(`/${username}/${tab}`);
  };

  return (
    <div className="flex justify-center">
      <UserFollowers />
      <UserFollowings />
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
            <Tabs value={currentTab}>
              <TabsList className="w-full gap-x-20">
                <TabsTrigger value="post" onClick={() => handleTabChange("")}>
                  <Grid2X2 /> <span>Post</span>
                </TabsTrigger>
                {username === userData.username && (
                  <TabsTrigger
                    value="saved"
                    onClick={() => handleTabChange("saved")}
                  >
                    <Bookmark /> <span>Saved</span>
                  </TabsTrigger>
                )}

                <TabsTrigger
                  value="tags"
                  onClick={() => handleTabChange("tags")}
                >
                  <SquareUserRound /> <span>Tagged</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
