/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import NotFound from "./NotFound";
import { useUserStore } from "@/store/useUserStore";
import MyProfile from "@/components/profile/MyProfile";
import { Bookmark, Grid2X2, Tags } from "lucide-react";
import UserProfile from "@/components/profile/UserProfile";
import ProfileLoading from "@/components/skeleton/ProfileLoading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useParams, useLocation, Link } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const { username } = useParams();
  const { profile, getUserProfile, loading } = useUserStore();

  useEffect(() => {
    getUserProfile(username);
  }, [username]);

  if (loading) return <ProfileLoading />;

  if (profile && profile.length === 0) return <NotFound />;

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl py-10 space-y-10 px-4">
        {profile?.isMyProfile ? (
          <MyProfile profile={profile} />
        ) : (
          <UserProfile profile={profile} />
        )}

        <div>
          <Tabs defaultValue={location.pathname}>
            <TabsList className="w-full">
              <Link to="">
                <TabsTrigger value="">
                  <Grid2X2 /> <span>Post</span>
                </TabsTrigger>
              </Link>
              <Link to="saved">
                <TabsTrigger value="saved">
                  <Bookmark /> <span>Saved</span>
                </TabsTrigger>
              </Link>
              <Link to="tags">
                <TabsTrigger value="tags">
                  <Tags /> <span>tags</span>
                </TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
