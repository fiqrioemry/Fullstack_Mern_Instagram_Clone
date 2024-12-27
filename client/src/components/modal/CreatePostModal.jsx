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

const CreatePostModal = () => {
  const { openModal, handleOpenModal, handleCloseModal } = useProvider();

  return (
    <Dialog
      open={openModal.create}
      onOpenChange={(isOpen) => (isOpen ? null : handleCloseModal("create"))}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => handleOpenModal("discard")}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
