/* eslint-disable react/prop-types */
import { Image } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";

const AttachImage = ({ form }) => {
  const { singleFile } = useFileUpload(form.setFieldValue, form.values);

  return (
    <label htmlFor="file" className="h-5 w-5">
      <Image />
      <input
        id="file"
        name="image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={singleFile}
      />
    </label>
  );
};

export default AttachImage;
