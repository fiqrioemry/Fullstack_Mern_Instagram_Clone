/* eslint-disable react/prop-types */
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

const DiscardPostModal = ({ handleDiscardChanges }) => {
  const { openModal, handleCloseModal } = useProvider();

  return (
    <Dialog
      open={openModal.discard}
      onOpenChange={(isOpen) => (isOpen ? null : handleCloseModal("discard"))}
    >
      <DialogContent variant="discard">
        <DialogHeader>
          <DialogTitle>Discard Post ? </DialogTitle>
          <DialogDescription>
            If you leave, your edits wont be saved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-y-3">
          <Button
            variant="destructive"
            size="md"
            onClick={handleDiscardChanges}
          >
            Discard
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => handleCloseModal("discard")}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscardPostModal;
