import { useState } from "react";
import { profileControl } from "@/config";
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

  const handleCancel = () => {
    profileForm.resetForm();
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
          <div className="space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-selection"
            >
              cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-selection"
              disabled={!profileForm.dirty || !profileForm.isValid}
            >
              save
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              onClick={handleEdit}
              className="btn-selection "
            >
              Edit Profile
            </button>
          </div>
        )}
      </InputForm>
    </div>
  );
};

export default ProfileSetting;
