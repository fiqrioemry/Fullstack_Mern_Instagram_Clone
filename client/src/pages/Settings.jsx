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
    <div className="min-h-screen">
      <div className="grid grid-cols-12 gap-4 px-2 md:px-10 py-[4rem] md:py-[2rem]">
        <AvatarSetting />
        <ProfileSetting />
      </div>
    </div>
  );
};

export default Settings;
