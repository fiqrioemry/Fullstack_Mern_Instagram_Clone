import { useState } from "react";
import { Ellipsis } from "lucide-react";
import ConfirmationBox from "./ConfirmationBox";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const PostOptions = ({}) => {
  const [open, setOpen] = useState(false);
  const { toggleFollow, loading } = useUserStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFollow = () => toggleFollow(data.userId);

  const handleUnfollowClick = () => {
    setSelectedUser(data.userId);
    setShowConfirmation(true);
  };

  const handleConfirmUnfollow = () => {
    if (selectedUser) toggleFollow(selectedUser);
    setShowConfirmation(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Ellipsis />
      </DialogTrigger>
      <DialogContent className="w-80 rounded-lg bg-white shadow-lg">
        <div className="flex flex-col text-center">
          <button>Report</button>
          <button>Go to Post</button>
          <button>Cancel</button>
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
