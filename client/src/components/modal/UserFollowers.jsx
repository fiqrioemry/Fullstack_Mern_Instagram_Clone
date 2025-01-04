import useMount from "../../hooks/useMount";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useUserStore } from "../../store/useUserStore";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const UserFollowers = () => {
  const mount = useMount();

  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { userData } = useAuthStore();
  const { getFollowings, getFollowers, followers, folowings } = useUserStore();
  const isModalOpen = location.pathname === `/${username}/followers`;

  const handleCloseModal = () => {
    navigate(`/${username}`);
  };

  useEffect(() => {
    getFollowings(username);
    getFollowers(userData.username);
  }, []);

  if (!mount) return null;

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => !open && handleCloseModal()}
    >
      <DialogContent variant="options" className="max-w-lg">
        <DialogTitle className="text-center content_margin">
          <div>Followers</div>
        </DialogTitle>

        <div className="px-4 space-y-4">
          <ScrollArea>{!followers ? null : <div>MASUK</div>}</ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserFollowers;
