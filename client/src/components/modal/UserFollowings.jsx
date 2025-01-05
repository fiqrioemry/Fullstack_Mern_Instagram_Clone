import { useEffect } from "react";

import FollowSkeleton from "../skeleton/FollowSkeleton";
import { useUserStore } from "../../store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProvider } from "../../context/GlobalProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UserFollowBox from "../UserFollowBox";

const UserFollowings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { mount, setMount } = useProvider();
  const { getFollowings, followings } = useUserStore();
  const isModalOpen = location.pathname === `/${username}/followings/`;

  const handleCloseModal = () => {
    setMount(false);
    navigate(`/${username}`);
  };

  useEffect(() => {
    if (mount) {
      getFollowings(username);
    }
  }, [getFollowings, mount, username]);

  if (!followings || !mount) return null;

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent variant="options" className="max-w-lg">
          <DialogTitle className="text-center py-4 border-b border-white/25">
            <div>Followings</div>
          </DialogTitle>

          <ScrollArea className=" h-[17rem] rounded-md border">
            <div className="py-2 px-5 space-y-4">
              {!followings
                ? [...Array(4)].map((__, index) => (
                    <FollowSkeleton key={index} />
                  ))
                : followings.map((user) => (
                    <UserFollowBox user={user} key={user.userId} />
                  ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserFollowings;
