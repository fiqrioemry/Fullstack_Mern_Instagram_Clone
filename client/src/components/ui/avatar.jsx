/* eslint-disable react/prop-types */
const Avatar = ({ data }) => {
  return (
    <div className="flex-shrink-0">
      <img
        src={data.avatar}
        alt={data.username}
        className="w-9 h-9 border border-muted rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
