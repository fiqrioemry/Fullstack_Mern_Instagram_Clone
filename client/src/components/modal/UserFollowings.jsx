import { useEffect } from "react";

import { useUserStore } from "../../store/useUserStore";

import { useProvider } from "../../context/GlobalProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UserFollowBox from "../UserFollowBox";

const UserFollowings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { mount, setMount, setBackground } = useProvider();
  const { getFollowings, followings } = useUserStore();
  const isModalOpen = location.pathname === `/${username}/followings/`;

  const handleCloseModal = () => {
    setMount(false);
    setBackground(null);
    navigate(-1);
  };

  useEffect(() => {
    if (mount) {
      getFollowings(username);
    }
  }, [getFollowings, mount, username]);

  if (!mount) return null;

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent variant="options" className="max-w-lg">
          <DialogTitle className="text-center content_margin">
            <h4>Followings</h4>
          </DialogTitle>

          <ScrollArea className=" h-[17rem] rounded-md ">
            <div className="py-2 px-5 space-y-4">
              {!followings ? (
                [...Array(4)].map((__, index) => <FollowSkeleton key={index} />)
              ) : followings.length === 0 ? (
                <div className="h-[15rem] flex items-center justify-center">
                  <span>No Followings to show</span>
                </div>
              ) : (
                followings.map((user) => (
                  <UserFollowBox user={user} key={user.userId} />
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserFollowings;
