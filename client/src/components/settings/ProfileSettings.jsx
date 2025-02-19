import { profileControl } from "@/config";
import { useUserStore } from "@/store/useUserStore";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useFormSchema } from "@/hooks/useFormSchema";
import InputButton from "../form/InputButton";
import InputForm from "../form/InputForm";

const ProfileSettings = () => {
  const { profile, updateMyProfile, loading } = useUserStore();
  const profileForm = useFormSchema(profile, profileControl, updateMyProfile);

  return (
    <div>
      <InputForm formik={profileForm} formControl={profileControl}>
        <InputButton title="Submit" loading={loading} formik={profileForm} />
      </InputForm>
    </div>
  );
};

export default ProfileSettings;
