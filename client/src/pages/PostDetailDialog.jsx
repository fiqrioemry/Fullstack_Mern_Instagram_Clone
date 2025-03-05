import { useEffect } from "react";
import { usePostStore } from "@/store/usePostStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import DialogDisplay from "@/components/post/DialogDisplay";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PostDetailLoading from "@/components/skeleton/PostDetailLoading";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const PostDetailDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = usePostStore((state) => state.post);
  const setPost = usePostStore((state) => state.setPost);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (id) {
      setPost(parseInt(id));
    }
  }, [setPost, id]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && navigate(-1)}>
        <DialogTitle>
          <DialogContent className="md:max-w-5xl p-0 bg-background">
            {post ? <DialogDisplay post={post} /> : <PostDetailLoading />}
          </DialogContent>
        </DialogTitle>
      </Dialog>
    );
  }

  return (
    <Drawer open={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DrawerContent>
        {post ? <DialogDisplay post={post} /> : <PostDetailLoading />}
      </DrawerContent>
    </Drawer>
  );
};

export default PostDetailDialog;
