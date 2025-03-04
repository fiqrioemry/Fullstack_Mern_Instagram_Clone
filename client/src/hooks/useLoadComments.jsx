import { useEffect, useRef, useState } from "react";
import { useFormSchema } from "@/hooks/useFormSchema";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";

const useLoadComments = (post) => {
  const commentRef = useRef(null);
  const [limit, setLimit] = useState(5);
  const { createComment, getComments, totalComments, comments, loading } =
    useCommentStore();
  const commentForm = useFormSchema(
    commentState,
    commentControl,
    createComment,
    post.postId
  );

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };
  useEffect(() => {
    if (post.postId) {
      getComments(post.postId, limit);
    }
  }, [getComments, post.postId, limit]);

  return {
    limit,
    loading,
    comments,
    commentForm,
    commentRef,
    totalComments,
    handleLoadMore,
  };
};

export default useLoadComments;
