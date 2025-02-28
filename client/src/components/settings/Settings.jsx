import { useState } from "react";
import { profileControl } from "@/config";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/form/InputForm";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import UploadAvatar from "@/components/form/UploadAvatar";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { updateProfile, profile, updating } = useUserStore();
  const profileForm = useFormSchema(profile, profileControl, updateProfile);

  console.log(profile);

  const handleCancel = () => {
    profileForm.resetForm();
    setEditProfile(false);
  };

  const handleSave = async () => {
    await profileForm.submitForm();
    setEditProfile(false);
  };

  return (
    <div className="py-12 md:py-6">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 md:col-span-4">
          <div className="flex justify-center w-full">
            <UploadAvatar
              formik={profileForm}
              upload={updateProfile}
              loading={updating}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 ">
          <InputForm
            formik={profileForm}
            disabled={!editProfile}
            formControl={profileControl}
          >
            {editProfile && (
              <div className="space-x-4">
                <Button type="button" onClick={handleCancel}>
                  cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={!profileForm.dirty || !profileForm.isValid}
                >
                  save
                </Button>
              </div>
            )}
            {!editProfile && (
              <div>
                <Button type="button" onClick={() => setEditProfile(true)}>
                  Edit Profile
                </Button>
              </div>
            )}
          </InputForm>
        </div>
      </div>
    </div>
  );
};

export default Profile;
