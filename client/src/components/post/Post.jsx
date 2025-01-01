const Post = () => {
  return (
    <div className="flex flex-row">
      <div className=" md:block hidden md:w-[45%]">
        <PostImagesDisplay images={post.images} />
      </div>

      <div className="w-full md:w-[55%] flex flex-col justify-between">
        <div>
          <div className="border-b border-muted-foreground/25">
            <PostContent user={post} />
          </div>
          <div className="h-[180px] space-y-3 overflow-y-scroll no-scrollbar">
            <PostContent user={post} content={post.content} />
            {/* <PostComments comments={post.Comments} /> */}
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
  );
};

export default Post;
