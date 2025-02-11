import { useEffect } from "react";
import { profileControl } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import InputForm from "@/components/form/InputForm";
import { useFormSchema } from "@/hooks/useFormSchema";
import { useFileUpload } from "@/hooks/useFileUpload";
import InputButton from "@/components/form/InputButton";
import UploadButton from "@/components/form/UploadButton";

const Settings = () => {
  const { updateMyProfile, loading, getMyProfile, profile } = useUserStore();
  const profileForm = useFormSchema(profile, profileControl, updateMyProfile);

  const { singleUpload } = useFileUpload(
    profileForm.setFieldValue,
    profileForm.values.avatar
  );

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center max-w-3xl px-6 mt-20 md:mt-10 mb-20">
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <div className="py-2">
                <label className="px-2 text-lg font-semibold">Profile</label>
              </div>
              <div className="p-6 flex gap-8 border rounded-lg">
                <div className="w-28 h-28 rounded-full border">
                  <img
                    src={profileForm.values.avatar}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className=" text-xl font-semibold">ahmadfiqri95</h2>
                  <UploadButton
                    title="Change Photo"
                    inputName={"avatar"}
                    loading={loading}
                    action={singleUpload}
                  />
                </div>
              </div>
            </div>
            <InputForm>
              <InputButton loading={loading} formik={profileForm} />
            </InputForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
