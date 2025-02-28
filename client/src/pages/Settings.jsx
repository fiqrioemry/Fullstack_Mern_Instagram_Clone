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
    <div className="min-h-screen w-full ">
      <div className="grid grid-cols-12 gap-4 px-2 md:px-10 pt-[2rem] pb-[4rem] md:pb-0">
        <AvatarSetting />
        <ProfileSetting />
      </div>
    </div>
  );
};

export default Settings;
