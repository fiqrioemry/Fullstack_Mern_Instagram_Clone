import Post from "../posts/Post";
import { useEffect } from "react";
import PostSkeleton from "../skeleton/PostSkeleton";
import { usePostStore } from "../../store/usePostStore";
import { useProvider } from "../../context/GlobalProvider";
import { useCommentStore } from "../../store/useCommentStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const DetailPostModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { mount, setMount } = useProvider();
  const { getPostDetail, post } = usePostStore();
  const { getComments, comments } = useCommentStore();
  const isPostModal = location.pathname === `/p/${id}`;

  const handleCloseModal = () => {
    setMount(false);
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      getPostDetail(id);
      getComments(id);
    }
  }, [id, getPostDetail, mount, getComments]);

  if (!mount) return null;
  return (
    <>
      <Dialog
        open={isPostModal}
        onOpenChange={(open) => !open && handleCloseModal()}
      >
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
