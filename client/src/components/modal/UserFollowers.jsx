import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useProvider } from "../../context/GlobalProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const UserFollowers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { mount, setMount } = useProvider();
  const { getFollowers, followers } = useUserStore();
  const isModalOpen = location.pathname === `/${username}/followers/`;

  const handleCloseModal = () => {
    setMount(false);
    navigate(`/${username}`);
  };

  useEffect(() => {
    if (mount) {
      getFollowers(username);
    }
  }, [mount, username]);

  if (!followers || !mount) return null;

  return (
    <>
      {!followers ? null : (
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
      )}
    </>
  );
};

export default UserFollowers;
