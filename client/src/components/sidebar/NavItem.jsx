import { forwardRef } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/display-name, react/prop-types
const NavItem = forwardRef(({ to, onClick, icon, label, labelClass }, ref) => {
  const props = to ? { to } : { onClick };
  return (
    <Link ref={ref} className="btn-nav" {...props}>
      <div className="flex-center w-20 px-3 py-2">{icon}</div>
      <span className={labelClass}>{label}</span>
    </Link>
  );
});

export default NavItem;
