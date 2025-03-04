/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";
import useScrollToView from "@/hooks/useScrollToView";

const LoadMoreButton = ({ onClick, loading, state, total, limit }) => {
  const { viewRef } = useScrollToView(state, loading);

  if (total <= limit) return <div ref={viewRef} />;

  return (
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="btn-secondary">
        <Plus />
      </button>
      <div ref={viewRef} />
    </div>
  );
};

export default LoadMoreButton;
