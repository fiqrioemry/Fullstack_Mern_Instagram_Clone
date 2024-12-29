import { useRef, useState } from "react";

export const useHandleForm = (initialFormState) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      const mediaFiles = fileArray.map((file) => ({
        fileName: file.name,
        url: URL.createObjectURL(file),
      }));

      setFormData((prev) => ({
        ...prev,
        preview: [
          ...(prev.preview || []),
          ...mediaFiles.map((file) => file.url),
        ],
        images: [
          ...(prev.images || []),
          ...mediaFiles.map((file) => file.fileName),
        ],
      }));
    } else {
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
