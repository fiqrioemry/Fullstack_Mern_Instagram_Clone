import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import AvatarSetting from "@/components/settings/AvatarSetting";
import ProfileSetting from "@/components/settings/ProfileSetting";
import SettingsLoading from "@/components/skeleton/SettingsLoading";

const Settings = () => {
  const { getMyProfile, profile } = useUserStore();

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  if (!profile) return <SettingsLoading />;

  return (
    <div className="min-h-screen py-12 px-0 md:px-10 mb-4 md:mb-0">
      <div>
        <AvatarSetting />
        <ProfileSetting />
      </div>
    </div>
  );
};

export default Settings;
