const Testing = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="block md:hidden h-14 top-0 left-0 right-0 bg-blue-500 text-center">
        <h1>header</h1>
      </header>
      <div className="flex-1 flex">
        {/* sidebar */}
        <div className="hidden md:block bg-green-500 top-0 w-72 bottom-0 left-0 z-10"></div>

        <div className="flex-1 h-[81vh] md:h-screen overflow-y-auto">
          <div className="mx-2 md:mx-8 py-4 space-y-2 ">
            <div className="h-14 bg-yellow-200 text-center">PERTAMA</div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">
              content halaman
            </div>
            <div className="h-14 bg-yellow-200 text-center">TERAKHIR</div>
          </div>
        </div>
      </div>
      <footer className="block md:hidden h-14 bottom-0 left-0 right-0 bg-red-500  text-center">
        <h1>footer</h1>
      </footer>
    </div>
  );
};

export default Testing;
