/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ConfirmationBox = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  confirmVariant = "delete",
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:w-[400px] p-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-gray-600 mt-2 text-sm">{message}</p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Button
            variant={confirmVariant}
            className="w-full font-semibold"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            {cancelLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationBox;
