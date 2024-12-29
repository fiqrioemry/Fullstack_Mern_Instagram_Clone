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
    // Tentukan apakah ini form pendaftaran atau profil berdasarkan jumlah field kosong di initial state
    const isSignUpForm = Object.values(initialFormState).every(
      (value) => !value.trim()
    );

    // Jika form pendaftaran, semua field wajib harus terisi
    if (isSignUpForm) {
      const allFieldsFilled = Object.keys(formData).every((key) => {
        return formData[key]?.trim(); // Semua field wajib harus diisi
      });
      return allFieldsFilled; // True jika semua terisi
    }

    // Jika form profil, validasi perubahan field
    const allowedEmptyFields = Object.keys(initialFormState).filter(
      (key) => !initialFormState[key]?.trim()
    );

    const hasEmptyRequiredField = Object.keys(formData).some((key) => {
      const currentValue = formData[key]?.trim();
      return !allowedEmptyFields.includes(key) && !currentValue;
    });

    if (hasEmptyRequiredField) {
      return false; // Tidak valid jika ada field wajib yang kosong
    }

    // Cek perubahan nilai
    const hasChanges = Object.keys(initialFormState).some((key) => {
      const trimmedInitial = initialFormState[key]?.trim() || "";
      const trimmedCurrent = formData[key]?.trim() || "";
      return trimmedInitial !== trimmedCurrent;
    });

    return hasChanges; // True jika ada perubahan
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
