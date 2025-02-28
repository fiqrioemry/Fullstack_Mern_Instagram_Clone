import { useEffect } from "react";
import Post from "@/components/post/Post";
import { usePostStore } from "@/store/usePostStore";
import PostLoading from "@/components/skeleton/PostLoading";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const PostDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = usePostStore((state) => state.post);
  const setPost = usePostStore((state) => state.setPost);

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

  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogTitle>
        <DialogContent className="h-screen overflow-hidden max-w-4xl md:max-w-[62rem] bg-background">
          {post ? <Post post={post} /> : <PostLoading />}
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default PostDialog;
