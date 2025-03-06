/* eslint-disable react/prop-types */
const Avatar = ({ avatar }) => {
  return (
    <div className="w-9 h-9 border border-muted overflow-hidden rounded-full flex-shrink-0 ">
      <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
    </div>
  );
};

export default Avatar;
