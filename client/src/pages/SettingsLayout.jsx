import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import Settings from "@/components/profile/Settings";
import PageLoading from "@/components/skeleton/PageLoading";

const SettingsLayout = () => {
  const { getMyProfile, loading } = useUserStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="px-4 mt-4 mb-4 space-y-6">
          {loading ? <PageLoading /> : <Settings />}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
