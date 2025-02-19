import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import Settings from "@/components/profile/Settings";
import SettingsLoading from "@/components/skeleton/SettingsLoading";

const SettingsLayout = () => {
  const { getMyProfile, loading } = useUserStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="px-4 mt-4 mb-4 space-y-6">
          {loading ? <SettingsLoading /> : <Settings />}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
