import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import PostLoading from "./skeleton/PostLoading";

const TestingDetailDialog = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, loading, getPostDetail } = usePostStore();

  useEffect(() => {
    getPostDetail(postId);
  }, [location]);

  useEffect(() => {
    if (location.state?.background) {
      window.history.replaceState({}, "", location.pathname);
    }
  }, [location]);

  return (
    <Dialog defaultOpen={true} onOpenChange={(open) => !open && navigate(-1)}>
      <DialogContent variant="detail">
        {loading ? <PostLoading/> :}
      </DialogContent>
    </Dialog>
  );
};

export default TestingDetailDialog;
