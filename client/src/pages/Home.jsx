import Posts from "../components/post/Posts";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <div className="flex justify-center h-[300vh]">
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
