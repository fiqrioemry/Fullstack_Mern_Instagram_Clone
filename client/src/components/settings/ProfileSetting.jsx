import { useState } from "react";
import { profileControl } from "@/config";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/form/InputForm";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";

const ProfileSetting = () => {
  const { updateProfile, profile } = useUserStore();
  const [editProfile, setEditProfile] = useState(false);
  const profileForm = useFormSchema(profile, profileControl, updateProfile);

  const handleEdit = () => {
    setEditProfile(true);
  };

  const handleCancel = async () => {
    await profileForm.resetForm();
    setEditProfile(false);
  };

  const handleSave = async () => {
    await profileForm.submitForm();
    setEditProfile(false);
  };

  return (
    <div className="col-span-12 md:col-span-8">
      <InputForm
        formik={profileForm}
        disabled={!editProfile}
        formControl={profileControl}
      >
        {editProfile ? (
          <div className="flex items-center gap-4">
            <Button
              type="button"
              className="min-w-32"
              variant="destructive"
              onClick={handleCancel}
            >
              cancel
            </Button>
            <Button
              type="button"
              variant="accent"
              className="min-w-32"
              onClick={handleSave}
              disabled={!profileForm.dirty || !profileForm.isValid}
            >
              save
            </Button>
          </div>
        ) : (
          <div>
            <Button
              type="button"
              variant="secondary"
              className="min-w-32"
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </div>
        )}
      </InputForm>
    </div>
  );
};

export default ProfileSetting;
