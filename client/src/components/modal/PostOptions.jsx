/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmationBox from "./ConfirmationBox";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { usePostStore } from "@/store/usePostStore";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const PostOptions = ({ data }) => {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const { toggleFollow } = useUserStore();
  const { deletePost } = usePostStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deletePost(false);
  };
  const handleUnfollow = () => {
    setSelectedUser(data.userId);
    setShowConfirmation(true);
  };

  const handleFollow = () => {
    toggleFollow(data.userId);
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
            className="btn btn-delete border-b border-muted-foreground rounded-none py-4"
            onClick={user.userId === data.userId ? handleDelete : handleReport}
          >
            {user.userId === data.userId ? "delete" : "report"}
          </button>
          {user.userId !== data.userId && (
            <button
              className="btn btn-delete border-b border-muted-foreground rounded-none py-4"
              onClick={data.isFollow ? handleUnfollow : handleFollow}
            >
              {data.isFollow ? "following" : "follow"}
            </button>
          )}
          <Link
            to={`p/${data.postId}`}
            className="btn btn-secondary border-b border-muted-foreground  rounded-none py-4"
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
        open={showConfirmation}
        confirmVariant="delete"
        onConfirm={handleConfirmUnfollow}
        title={
          user.userId === data.userId
            ? "Delete Post"
            : `Unfollow ${data.username}?`
        }
        onClose={() => setShowConfirmation(false)}
        message={
          user.userId === data.userId
            ? "Are you sure want to delete this post ?"
            : "Are you sure you want to unfollow this user?"
        }
        confirmLabel={user.userId === data.userId ? "Delete Post" : "unfollow"}
      />
    </Dialog>
  );
};

export default PostOptions;
