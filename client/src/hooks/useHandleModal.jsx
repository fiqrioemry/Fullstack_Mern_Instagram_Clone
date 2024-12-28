import { useState } from "react";

const useHandleModal = () => {
  const [openModal, setOpenModal] = useState({
    create: false,
    discard: false,
    detail: false,
  });

  const handleOpenModal = (name) => {
    setOpenModal((prev) => ({ ...prev, [name]: true }));
  };

  const handleCloseModal = (name) => {
    setOpenModal((prev) => ({ ...prev, [name]: false }));
  };

  const handleCloseAllModals = () => {
    setOpenModal({
      create: false,
      discard: false,
      detail: false,
    });
  };

  return {
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
    handleCloseAllModals,
  };
};

export default useHandleModal;
