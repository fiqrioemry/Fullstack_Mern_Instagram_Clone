import { X } from "lucide-react";
import { useEffect } from "react";
import FollowCard from "./FollowCard";
import NoFollowings from "./NoFollowings";
import { useUserStore } from "@/store/useUserStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import FollowLoading from "@/components/skeleton/FollowLoading";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

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
    <Dialog defaultOpen onOpenChange={(open) => !open && navigate(-1)}>
      <DialogContent className="sm:w-[400px] p-0 border-none bg-secondary">
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
            ) : followings.length ? (
              followings.map((user) => (
                <FollowCard data={user} key={user.userId} />
              ))
            ) : (
              <NoFollowings />
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Followings;
