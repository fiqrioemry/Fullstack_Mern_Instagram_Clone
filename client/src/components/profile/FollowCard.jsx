/* eslint-disable react/prop-types */
import { useState } from "react";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import ConfirmationBox from "@/components/modal/ConfirmationBox";

const FollowCard = ({ data }) => {
  const { user } = useAuthStore();
  const { toggleFollow, loading } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);
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
    <div className="flex items-center justify-between p-3 hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <Avatar avatar={data.avatar} />
        <div>
          <Link to={`/${data.username}`} className="font-medium text-gray-800">
            {data.username}
          </Link>
          <p className="text-gray-500 text-sm">{data.fullname}</p>
        </div>
      </div>
      {data.userId !== user.userId && (
        <Button
          onClick={data.isFollow ? handleUnfollowClick : handleFollow}
          variant={data.isFollow ? "following" : "follow"}
        >
          {loading[data.userId] ? (
            <Loader className="animate-spin" />
          ) : data.isFollow ? (
            "Following"
          ) : (
            "Follow"
          )}
        </Button>
      )}
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
    </div>
  );
};

export default FollowCard;
