/* eslint-disable react/prop-types */
import Caption from "./Caption";

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <>
          <Caption user={comment} />
        </>
      ))}
    </>
  );
};
export default Comments;
