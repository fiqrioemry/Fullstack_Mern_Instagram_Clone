/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { Ellipsis } from "lucide-react";
import ConfirmationBox from "./ConfirmationBox";
import { useUserStore } from "@/store/useUserStore";
import { useAuthStore } from "@/store/useAuthStore";
import { usePostStore } from "@/store/usePostStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const PostOptions = ({ data }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const { toggleFollow } = useUserStore();
  const { deletePost, updatePostsFollowStatus } = usePostStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setSelectedPost(data.postId);
    setShowConfirmation(true);
  };
  const handleUnfollow = () => {
    updatePostsFollowStatus(data.userId);
    setSelectedUser(data.userId);
    setShowConfirmation(true);
  };

  const handleFollow = () => {
    updatePostsFollowStatus(data.userId);
    toggleFollow(data.userId);
  };

  const handleConfirmDelete = () => {
    if (selectedPost) deletePost(data.postId, navigate);
    setShowConfirmation(false);
    setOpen(false);
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
        <Ellipsis className="btn-secondary" />
      </DialogTrigger>
      <DialogContent>
        <div>
          <button
            className="w-full btn-delete border-b border-muted-foreground/20 py-4"
            onClick={user.userId === data.userId ? handleDelete : handleReport}
          >
            {user.userId === data.userId ? "delete" : "report"}
          </button>
          {user.userId !== data.userId && (
            <button
              className="w-full btn-delete  border-b border-muted-foreground/20 py-4"
              onClick={data.isFollow ? handleUnfollow : handleFollow}
            >
              {data.isFollow ? "unfollow" : "follow"}
            </button>
          )}
          <Link
            to={
              location === `/p/${data.postId}`
                ? `/${data.username}`
                : `/p/${data.postId}`
            }
            className="btn btn-secondary  border-b border-muted-foreground/20 rounded-none py-4"
          >
            {location === `/p/${data.postId}` ? "go to profile" : "go to post"}
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
        onConfirm={
          user.userId === data.userId
            ? handleConfirmDelete
            : handleConfirmUnfollow
        }
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
