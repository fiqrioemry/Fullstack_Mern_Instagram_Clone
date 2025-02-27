// eslint-disable-next-line react/prop-types
const MenuItem = ({ ref, onClick, icon, label, labelClass }) => {
  return (
    <button ref={ref} onClick={onClick} className="btn-nav">
      <div className="flex-center w-20 px-3 py-2">{icon}</div>
      <span className={labelClass}>{label}</span>
    </button>
  );
};

export default MenuItem;
