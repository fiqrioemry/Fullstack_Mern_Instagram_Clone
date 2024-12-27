import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useProvider } from "../../context/GlobalProvider";
import { useHandleForm } from "../../hooks/useHandleForm";
import { initialPostForm } from "../../config";

const CreatePostModal = () => {
  const { openModal, handleCloseModal } = useProvider();
  const { formData, handleChange, handleMediaFile } =
    useHandleForm(initialPostForm);

  return (
    <Dialog
      open={openModal.create}
      onOpenChange={(isOpen) => (isOpen ? null : handleCloseModal("create"))}
    >
      <DialogContent className="sm:max-w-[425px]"></DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
