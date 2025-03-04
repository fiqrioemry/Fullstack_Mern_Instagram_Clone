/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Content = ({ data }) => {
  return (
    <div className="flex-1 space-x-1">
      <Link to={`/${data.username}`} className="btn-secondary">
        {data.username}
      </Link>
      <span className="text-sm">{data.content}</span>
    </div>
  );
};

export default Content;
