import { useEffect } from "react";
import useMount from "../../hooks/useMount";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostStore } from "../../store/usePostStore";
import { useNavigate, useParams } from "react-router-dom";
import PostImagesDisplay from "../post/PostImagesDisplay";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PostComments from "../post/PostComments";
import PostContent from "../post/PostContent";
import PostControl from "../post/PostControl";
import CommentForm from "../form/CommentForm";
import { initialCommentConfig, initialCommentForm } from "../../config";

const DetailPostModal = () => {
  const { id } = useParams();
  const mount = useMount();
  const navigate = useNavigate();
  const { getPostDetail, detailPost } = usePostStore();
  const isPostModal = window.location.pathname === `/p/${id}`;
  console.log(detailPost);
  useEffect(() => {
    getPostDetail(id);
  }, []);

  if (!mount) return null;

  return (
    <>
      <Dialog open={isPostModal} onOpenChange={(open) => !open && navigate(-1)}>
        <DialogTitle>
          <DialogContent variant="detail">
            {detailPost.length === 0 && (
              <div className="flex w-full">
                <Skeleton className="h-[450px] w-[45%] rounded-none" />

                <div className="h-[450px] w-[55%] py-2 px-4">
                  <div className="flex items-center w-full gap-x-4 mb-6">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-1/3 rounded-full" />
                  </div>
                  <div className="space-y-6">
                    {[...Array(4)].map((_, index) => (
                      <div
                        className="flex items-center w-full gap-x-4"
                        key={index}
                      >
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 w-3/4">
                          <Skeleton className="h-4 w-1/3 rounded-full" />
                          <Skeleton className="h-4 w-full rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {detailPost.length !== 0 && (
              <div className="flex flex-row">
                <div className=" md:block hidden md:w-[45%]">
                  <PostImagesDisplay images={detailPost.PostGalleries} />
                </div>

                <div className="w-full md:w-[55%] flex flex-col justify-between">
                  <div>
                    <div className="border-b border-muted-foreground/25">
                      <PostContent user={detailPost.User} />
                    </div>
                    <div className="h-[180px] space-y-3 overflow-y-scroll no-scrollbar">
                      <PostContent
                        user={detailPost.User}
                        content={detailPost.content}
                      />
                      <PostComments comments={detailPost.Comments} />
                    </div>
                  </div>
                  <div className="px-2">
                    <PostControl />
                    <CommentForm
                      initialFormConfig={initialCommentConfig}
                      initialFormState={initialCommentForm}
                    />
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default DetailPostModal;
