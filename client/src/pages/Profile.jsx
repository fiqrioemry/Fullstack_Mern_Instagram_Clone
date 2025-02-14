import { useEffect } from "react";
import UserProfile from "@/components/profile/UserProfile";
import { useUserStore } from "@/store/useUserStore";
import { usePostStore } from "@/store/usePostStore";
import { Bookmark, Grid2X2, SquareUserRound } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Outlet, useParams, useLocation } from "react-router-dom";
import ProfileLoading from "@/components/skeleton/ProfileLoading";

const Profile = () => {
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
            <UserProfile user={profile} />
          )}

          {/* <div>
            <Tabs
              defaultValue={activeTab} // Menggunakan tab aktif yang tervalidasi
            >
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
