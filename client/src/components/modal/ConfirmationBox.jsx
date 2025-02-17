/* eslint-disable react/prop-types */
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ConfirmationBox = ({
  open,
  onClose,
  title,
  message,
  onConfirm,
  cancelLabel = "cancel",
  confirmLabel = "confirm",
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-secondary border-none p-0 pt-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-muted-foreground/60 mt-2 text-sm">{message}</p>
        </div>
        <div className="mt-4">
          <button
            className="btn btn-delete border-b py-4 rounded-none border-t border-muted-foreground/50"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button className="btn btn-secondary py-4" onClick={onClose}>
            {cancelLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationBox;
