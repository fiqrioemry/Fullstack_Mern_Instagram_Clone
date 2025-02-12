import Post from "@/components/post/Post";
import { useEffect } from "react";
import { usePostStore } from "@/store/usePostStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { DialogTitle } from "@radix-ui/react-dialog";

const PostDialog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { post, loading, getPostDetail } = usePostStore();
  console.log(post);
  useEffect(() => {
    getPostDetail(id);
  }, [getPostDetail, id]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogTitle>
        <DialogContent variant="detail">
          {loading && post.length === 0 && null}
          {post.length !== 0 && <Post post={post} />}
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
};

export default PostDialog;
