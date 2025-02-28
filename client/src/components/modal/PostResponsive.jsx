import { useEffect } from "react";
import Post from "@/components/post/Post";
import { usePostStore } from "@/store/usePostStore";
import { useMediaQuery } from "@/hooks/use-media-query";
import PostLoading from "@/components/skeleton/PostLoading";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function PostDialog() {
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
      <Dialog defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
        <DialogTitle>
          <DialogContent className="md:max-w-5xl p-0 bg-background ">
            {post ? <Post post={post} /> : <PostLoading />}
          </DialogContent>
        </DialogTitle>
      </Dialog>
    );
  }

  return (
    <Drawer defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DrawerContent>
        {post ? <Post post={post} /> : <PostLoading />}
      </DrawerContent>
    </Drawer>
  );
}
