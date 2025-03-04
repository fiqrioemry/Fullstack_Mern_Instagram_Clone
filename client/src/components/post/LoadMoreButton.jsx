/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="btn-secondary">
        <Plus />
      </button>
    </div>
  );
};

export default LoadMoreButton;
