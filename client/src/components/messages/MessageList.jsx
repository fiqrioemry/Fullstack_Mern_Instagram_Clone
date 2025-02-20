import Avatar from "@/components/ui/Avatar";

const MessageList = () => {
  const handleSelectedMessage = () => {};
  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {[...Array(5)].map((_, index) => (
        <button
          onClick={() => handleSelectedMessage()}
          className="hover:bg-secondary duration-300 w-full py-2 px-4"
          key={index}
        >
          <div className="flex items-center gap-4">
            <Avatar avatar={null} />
            <div className="flex flex-col items-start text-sm">
              <div>ahmadfiqri</div>
              <div>online</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MessageList;
