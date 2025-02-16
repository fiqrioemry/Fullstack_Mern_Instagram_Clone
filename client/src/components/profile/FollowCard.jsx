import { useState } from "react";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const FollowCard = ({ data }) => {
  const { user } = useAuthStore();
  const { follow, loading } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Ketika Follow, langsung eksekusi tanpa konfirmasi
  const handleFollow = (userId) => {
    follow(userId);
  };

  // Ketika Unfollow, tampilkan konfirmasi dulu
  const handleUnfollowClick = (userId) => {
    setSelectedUser(userId);
    setShowConfirmation(true);
  };

  // Jika konfirmasi Unfollow diklik
  const handleConfirmUnfollow = () => {
    if (selectedUser) {
      follow(selectedUser); // Karena follow adalah toggle, ini akan unfollow
      setShowConfirmation(false);
    }
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
        <div>
          {data.isFollow ? (
            <Button
              onClick={() => handleUnfollowClick(data.userId)} // Unfollow butuh konfirmasi
              variant="following"
            >
              {loading[data.userId] ? (
                <Loader className="animate-spin" />
              ) : (
                "Following"
              )}
            </Button>
          ) : (
            <Button
              onClick={() => handleFollow(data.userId)} // Follow langsung tanpa konfirmasi
              variant="follow"
            >
              {loading[data.userId] ? (
                <Loader className="animate-spin" />
              ) : (
                "Follow"
              )}
            </Button>
          )}
        </div>
      )}

      {/* Dialog Konfirmasi Unfollow */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:w-[400px] p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold">Unfollow {data.username}?</h4>
            <p className="text-gray-600 mt-2 text-sm">
              Are you sure you want to unfollow this user?
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant="destructive"
              className="w-full text-red-600 font-semibold"
              onClick={handleConfirmUnfollow}
            >
              Unfollow
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowConfirmation(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowCard;
