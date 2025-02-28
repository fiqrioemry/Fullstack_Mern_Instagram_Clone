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
  const { profile, getUserProfile, loading } = useUserStore();

  useEffect(() => {
    getUserProfile(username);
  }, [username]);

  if (loading) return <ProfileLoading />;

  if (profile && profile.length === 0) return <NotFound />;

  return (
    <div className="flex justify-center">
      <div className=" max-w-xl md:max-w-4xl py-10 ">
        <UserProfile profile={profile} />
        <NavTabs profile={profile} />
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
