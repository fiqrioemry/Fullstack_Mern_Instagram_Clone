import { useState } from "react";

const useHandleModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (e) => {
    setOpenModal((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleCloseModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  return {
    openModal,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useHandleModal;
