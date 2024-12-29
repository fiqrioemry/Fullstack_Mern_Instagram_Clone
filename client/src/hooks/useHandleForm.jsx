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
    // Field yang boleh kosong
    const allowedEmptyFields = Object.keys(initialFormState).filter(
      (key) => !initialFormState[key]
    );

    // Validasi apakah ada field kosong yang wajib diisi
    for (const key in formData) {
      if (
        formData.hasOwnProperty(key) &&
        !formData[key]?.trim() && // Pastikan nilai ter-trim bukan kosong
        !allowedEmptyFields.includes(key)
      ) {
        return false;
      }
    }

    // Validasi apakah ada perubahan dari initialFormState (mengabaikan spasi)
    const hasChanges = Object.keys(initialFormState).some((key) => {
      const trimmedInitial = initialFormState[key]?.trim() || "";
      const trimmedCurrent = formData[key]?.trim() || "";
      return trimmedInitial !== trimmedCurrent;
    });

    return hasChanges; // Tombol hanya aktif jika ada perubahan signifikan
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
