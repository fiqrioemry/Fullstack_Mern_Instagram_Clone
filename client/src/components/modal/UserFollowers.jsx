import { useEffect } from "react";
import UserFollowBox from "../UserFollowBox";

import { useUserStore } from "../../store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProvider } from "../../context/GlobalProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const UserFollowers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { getFollowers, followers } = useUserStore();
  const { mount, setMount, setBackground } = useProvider();
  const isModalOpen = location.pathname === `/${username}/followers/`;

  const handleCloseModal = () => {
    setMount(false);
    setBackground(null);
    navigate(-1);
  };

  useEffect(() => {
    if (mount) {
      getFollowers(username);
    }
  }, [getFollowers, mount, username]);

  if (!mount) return null;

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
        <DialogContent variant="options" className="max-w-lg">
          <DialogTitle className="text-center content_margin">
            <h4>followers</h4>
          </DialogTitle>

          {/* <ScrollArea className="h-[17rem] rounded-md">
            <div className="py-2 px-5 space-y-4">
              {!followers ? (
                [...Array(4)].map((__, index) => <FollowSkeleton key={index} />)
              ) : followers.length === 0 ? (
                <div className="h-[15rem] flex items-center justify-center">
                  <span>No Followers to show</span>
                </div>
              ) : (
                followers.map((user) => (
                  <UserFollowBox user={user} key={user.userId} />
                ))
              )}
            </div>
          </ScrollArea> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserFollowers;
