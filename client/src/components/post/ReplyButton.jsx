/* eslint-disable react/prop-types */
const ReplyButton = ({ form, data, parentId }) => {
  return (
    <button
      className="text-xs btn-secondary"
      onClick={() => {
        form.setFieldValue("postId", data.postId);
        form.setFieldValue("parentId", parentId);
        form.setFieldValue("content", `@${data.username} `);
      }}
    >
      Reply
    </button>
  );
};

export default ReplyButton;
