import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import ProfileSettings from "../components/settings/ProfileSettings";

const Settings = () => {
  const { getMyProfile, loading, profile } = useUserStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center">
          <div className="w-full max-w-[30rem] px-2">
            <div className="md:mt-0 mt-12 md:mb-0 mb-12 py-6">
              {loading || profile.length === 0 ? null : <ProfileSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
