import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const PageError = ({ error, onRetry }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mt-2">
          {error?.message ||
            "An unexpected error occurred. Please try again later."}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Retry
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageError;
