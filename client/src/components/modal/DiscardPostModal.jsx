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

const DiscardPostModal = () => {
  const { openModal, handleCloseModal, handleCloseAllModals } = useProvider();

  return (
    <Dialog
      open={openModal.discard}
      onOpenChange={(isOpen) => (isOpen ? null : handleCloseModal("discard"))}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Are you sure want to remove this post ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => handleCloseAllModals()}>Discard</Button>
          <Button onClick={() => handleCloseModal("discard")}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscardPostModal;
