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
      <DialogContent>
        <div className="text-center space-y-2">
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
        <div className="mt-4">
          <button
            className="btn-delete w-full py-4 border-b border-t border-muted"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
          <button className="btn-secondary w-full py-4" onClick={onClose}>
            {cancelLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationBox;
