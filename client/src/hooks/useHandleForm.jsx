import { useRef, useState } from "react";

export const useHandleForm = (initialFormState) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle media files
    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      // Generate media file objects
      const mediaFiles = fileArray.map((file) => ({
        name: file,
        url: URL.createObjectURL(file),
      }));

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...mediaFiles],
      }));
    } else {
      // Handle other input changes
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleValidate = () => {
    for (const key in formData) {
      // eslint-disable-next-line no-prototype-builtins
      if (formData.hasOwnProperty(key) && !formData[key]) {
        return false;
      }
    }
    return true;
  };

  const handleRemove = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e, action) => {
    e.preventDefault();
    action();
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleValidate,
    handleRemove,
    handleSubmit,
    fileInputRef,
  };
};
