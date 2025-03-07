/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { Ellipsis } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePostStore } from "@/store/usePostStore";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CommentOptions = ({ data }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const { deleteComment } = usePostStore();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteComment(data.commentId);
  };

  const handleReport = () => {
    toast.success("Report has been sent");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Ellipsis className="btn-secondary" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <VisuallyHidden>comment options</VisuallyHidden>
        </DialogTitle>
        <div>
          <button
            className="w-full btn-delete border-b border-muted-foreground/20 py-4"
            onClick={user.userId === data.userId ? handleDelete : handleReport}
          >
            {user.userId === data.userId ? "delete" : "report"}
          </button>

          <button className="btn btn-secondary py-4" onClick={handleClose}>
            close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentOptions;
