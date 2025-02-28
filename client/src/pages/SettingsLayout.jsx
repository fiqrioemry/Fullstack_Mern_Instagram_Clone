import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import Settings from "@/components/settings/Settings";
import SettingsLoading from "../components/skeleton/SettingsLoading";
import NotFound from "./NotFound";

const SettingsLayout = () => {
  const { getMyProfile, profile, loading } = useUserStore();

  useEffect(() => {
    console.log("setting 3");
    getMyProfile();
  }, [getMyProfile]);

  if (loading) return <SettingsLoading />;

  if (profile && profile.length === 0) return <NotFound />;

  return (
    <div className="min-h-screen">
      <div className="px-4 mt-4 mb-4 space-y-6">
        <Settings />
      </div>
    </div>
  );
};

export default SettingsLayout;
