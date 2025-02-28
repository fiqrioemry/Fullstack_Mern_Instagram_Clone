/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import NotFound from "./NotFound";
import NavTabs from "@/components/profile/NavTabs";
import { useUserStore } from "@/store/useUserStore";
import { Outlet, useParams } from "react-router-dom";
import UserProfile from "@/components/profile/UserProfile";
import ProfileLoading from "@/components/skeleton/ProfileLoading";

const Profile = () => {
  const { username } = useParams();
  const { profile, getUserProfile } = useUserStore();

  useEffect(() => {
    getUserProfile(username);
  }, [username]);

  if (!profile) return <ProfileLoading />;

  if (profile.length === 0) return <NotFound />;

  return (
    <div className="py-12">
      <UserProfile profile={profile} />
      <NavTabs profile={profile} />
      <Outlet />
    </div>
  );
};

export default Profile;
