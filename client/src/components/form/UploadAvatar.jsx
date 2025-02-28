/* eslint-disable react/prop-types */
import { Camera, Loader } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";

const UploadAvatar = ({ formik, upload, loading }) => {
  const { singleFile } = useFileUpload(
    formik.setFieldValue,
    formik.values.avatar,
    upload
  );

  return (
    <div>
      <div className="space-y-4">
        <div className="w-40 h-40 border border-muted-foreground overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={formik.values.avatar}
            alt="avatar picture"
          />
        </div>

        <button className="relative btn-selection" disabled={loading}>
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <Camera />
              <span>change avatar</span>
            </>
          )}
          <label
            htmlFor="change avatar"
            className="absolute top-0 right-0 left-0 bottom-0 z-10"
          >
            <input
              id="change avatar"
              type="file"
              name="avatar"
              accept="image/*"
              className="hidden"
              disabled={loading}
              onChange={singleFile}
            />
          </label>
        </button>
      </div>
    </div>
  );
};

export default UploadAvatar;
