import Post from "../posts/Post";
import { useEffect } from "react";
import useMount from "../../hooks/useMount";
import PostSkeleton from "../skeleton/PostSkeleton";
import { usePostStore } from "../../store/usePostStore";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCommentStore } from "../../store/useCommentStore";

const DetailPostModal = () => {
  const { id } = useParams();
  const mount = useMount();
  const navigate = useNavigate();
  const { getPostDetail, post } = usePostStore();
  const { getComments, comments } = useCommentStore();
  const isPostModal = window.location.pathname === `/p/${id}`;

  useEffect(() => {
    if (id) {
      getPostDetail(id);
      getComments(id);
    }
  }, [id, getPostDetail, getComments]);

  if (!mount) return null;

  return (
    <>
      <Dialog open={isPostModal} onOpenChange={(open) => !open && navigate(-1)}>
        <DialogTitle>
          <DialogContent variant="detail">
            {post.length === 0 ? (
              <PostSkeleton />
            ) : (
              <Post post={post} comments={comments} />
            )}
          </DialogContent>
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default DetailPostModal;
