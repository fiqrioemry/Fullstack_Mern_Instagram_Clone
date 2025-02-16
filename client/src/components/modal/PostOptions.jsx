/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ConfirmationBox from "./ConfirmationBox";
import { useUserStore } from "@/store/useUserStore";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const PostOptions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { toggleFollow } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleUnfollow = () => {
    setSelectedUser(data.userId);
    setShowConfirmation(true);
  };

  const handleConfirmUnfollow = () => {
    if (selectedUser) toggleFollow(selectedUser);
    setShowConfirmation(false);
  };

  const handleReport = () => {
    toast.success("Report has been sent");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Ellipsis />
      </DialogTrigger>
      <DialogContent className="max-w-96 bg-secondary border-none p-0">
        <div>
          <button
            className="btn btn-delete border-b border-muted-foreground py-4"
            onClick={handleReport}
          >
            report
          </button>
          <Link
            to={`p/${data.postId}`}
            className="btn btn-secondary border-b border-muted-foreground  py-4"
          >
            go to post
          </Link>
          <button className="btn btn-secondary py-4" onClick={handleClose}>
            close
          </button>
        </div>
      </DialogContent>

      <ConfirmationBox
        cancelLabel="Cancel"
        confirmLabel="Unfollow"
        open={showConfirmation}
        confirmVariant="delete"
        onConfirm={handleConfirmUnfollow}
        title={`Unfollow ${data.username}?`}
        onClose={() => setShowConfirmation(false)}
        message="Are you sure you want to unfollow this user?"
      />
    </Dialog>
  );
};

export default PostOptions;
