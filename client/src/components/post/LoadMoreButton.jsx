/* eslint-disable react/prop-types */
import { PlusCircle } from "lucide-react";
import useScrollToView from "@/hooks/useScrollToView";

const LoadMoreButton = ({ onClick, loading, total, limit }) => {
  const { viewRef } = useScrollToView(loading);

  if (total <= limit) return <div ref={viewRef} />;

  return (
    <div className="flex items-center justify-center">
      <button onClick={onClick} className="btn-secondary mt-2">
        <PlusCircle />
      </button>
      <div ref={viewRef} />
    </div>
  );
};

export default LoadMoreButton;
