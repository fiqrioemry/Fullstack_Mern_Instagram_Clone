import Post from "./Post";
import { useEffect } from "react";
import PostLoading from "./skeleton/PostLoading";
import { usePostStore } from "../store/usePostStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PostDialog = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { post, loading, getPostDetail } = usePostStore();

  useEffect(() => {
    getPostDetail(postId);
  }, [getPostDetail, postId]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogContent variant="detail">
        {loading ? null : <Post post={post} />}
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
