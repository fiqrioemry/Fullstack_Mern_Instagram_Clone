import { X } from "lucide-react";
import { useEffect } from "react";
import FollowCard from "./FollowCard";
import { useUserStore } from "@/store/useUserStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import FollowLoading from "@/components/skeleton/FollowLoading";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Followings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();
  const { getFollowings, followings, loading } = useUserStore();

  useEffect(() => {
    getFollowings(username);
  }, [getFollowings, username]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogTitle>
        <DialogContent variant="detail">
          <div>
            <div className="flex justify-between items-center p-4 border-b">
              <h3>Followings</h3>
              <DialogClose>
                <X size={24} />
              </DialogClose>
            </div>

            <ScrollArea className="h-80 overflow-y-auto">
              {loading ? (
                <FollowLoading />
              ) : (
                followings.map((user, index) => (
                  <FollowCard user={user} key={index} />
                ))
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default Followings;
