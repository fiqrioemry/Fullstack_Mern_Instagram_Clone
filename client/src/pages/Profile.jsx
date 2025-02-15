import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
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
  }, [getUserProfile, username]);

  return (
    <div className="flex justify-center">
      <div className="max-w-4xl w-full mt-14 mb-14">
        <div className="md:px-0 px-4 md:py-0 py-6">
          {/* user profile */}
          {loading.username ? (
            <ProfileLoading />
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
    </div>
  );
};

export default Profile;
