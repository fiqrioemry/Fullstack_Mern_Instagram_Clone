import { useState } from "react";
import { profileControl } from "@/config";
import { Button } from "@/components/ui/button";
import InputForm from "@/components/form/InputForm";
import { useUserStore } from "@/store/useUserStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";
import UploadButton from "@/components/form/UploadButton";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const { updateMyProfile, profile, updating } = useUserStore();

  const profileForm = useFormSchema(profile, profileControl, updateMyProfile);

  const { singleFile } = useFileUpload(
    profileForm.setFieldValue,
    profileForm.values,
    updateMyProfile
  );

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
          <div className="p-4 space-y-4 default_border">
            <div className="flex justify-center w-full">
              <div className="space-y-4 max-w-60">
                <div className="overflow-hidden">
                  <div className="w-40 h-40 border border-muted-foreground">
                    <img
                      className="w-full h-full object-cover"
                      src={profile?.avatar}
                      alt="avatar"
                    />
                  </div>
                </div>
                <UploadButton
                  title="Change photo"
                  loading={updating}
                  inputName="avatar"
                  action={singleFile}
                  disabled={editProfile}
                />
              </div>
            </div>
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
