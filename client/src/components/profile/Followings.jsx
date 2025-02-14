import { X } from "lucide-react";
import { useEffect } from "react";
import FollowCard from "./FollowCard";
import NoFollowings from "./NoFollowings";
import { useUserStore } from "@/store/useUserStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import FollowLoading from "@/components/skeleton/FollowLoading";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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

  console.log(followings);

  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogTitle>
        <DialogContent variant="detail">
          <div>
            <div className="flex justify-center items-center p-4 border-b relative">
              <h4>Followings</h4>
              <DialogClose className="absolute right-3">
                <X size={24} />
              </DialogClose>
            </div>

            <ScrollArea className="h-80 overflow-y-auto">
              {loading ? (
                <FollowLoading />
              ) : followings.length !== 0 ? (
                followings.map((user, index) => (
                  <FollowCard user={user} key={index} />
                ))
              ) : (
                <NoFollowings />
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default Followings;
