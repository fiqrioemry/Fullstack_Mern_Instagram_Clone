import Posts from "../components/post/Posts";
import DetailPostModal from "../components/modal/DetailPostModal";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <DetailPostModal />
        <div className="flex justify-center">
          <Posts />
        </div>
      </div>
      <div className="w-[24rem] xl:block hidden bg-blue-500">
        {/* right sidebar */}
      </div>
    </div>
  );
};

export default Home;
