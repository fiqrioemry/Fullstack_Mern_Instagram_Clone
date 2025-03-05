import React from "react";

const ShowMoreReplies = () => {
  return (
    <div>
      {comment.replies > 0 && !replies[comment.commentId] && (
        <button
          onClick={() => showReplies(comment)}
          className="flex items-center text-xs space-x-2 text-muted-foreground"
        >
          <span> View replies ({comment.replies}) </span>
          {loading[comment.commentId] && (
            <Loader size={18} className="animate-spin" />
          )}
        </button>
      )}
    </div>
  );
};

export default ShowMoreReplies;
