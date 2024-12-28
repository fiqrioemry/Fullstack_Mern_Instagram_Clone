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
      <DialogContent className="max-w-[20rem] md:max-w-[24rem] gap-4 p-6">
        <DialogHeader>
          <DialogTitle>Discard Post ? </DialogTitle>
          <DialogDescription>
            If you leave, your edits wont be saved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-y-3">
          <Button variant="destructive" onClick={handleDiscardChanges}>
            Discard
          </Button>
          <Button onClick={() => handleCloseModal("discard")}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscardPostModal;
