/* eslint-disable react/prop-types */
import { PlusCircle } from "lucide-react";

const LoadMoreButton = ({ onClick, total, limit }) => {
  if (total <= limit) return null;

  return (
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="btn-secondary mt-2">
        <PlusCircle />
      </button>
    </div>
  );
};

export default LoadMoreButton;
