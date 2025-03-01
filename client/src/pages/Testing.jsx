import { Menu } from "lucide-react";

const Testing = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* HEADER */}
      <header className="block h-14 md:hidden py-2 top-0 left-0 right-0 px-4 text-center border-b border-muted z-10">
        <div className="flex items-center gap-4">
          <h3>LOGO</h3>
          <input className="flex-1 border border-muted py-2 px-4" />
          <Menu />
        </div>
      </header>

      <div className="flex-1 flex">
        {/* SIDEBAR */}
        <div className="hidden md:block bg-green-500 top-0 md:w-20 lg:w-80 bottom-0 left-0 z-10"></div>

        {/* BAGIAN INI DIBAWAH MD TINGGINYA MENYESUAIKAN SETELAH DIKURANGI HEADER DAN FOOTER */}
        <div className="flex-1 overflow-y-auto md:h-screen h-[calc(100vh-56px-56px)]">
          <div className="mx-2 md:mx-8 space-y-2 py-10">
            <div className="h-40 bg-yellow-200 flex items-center justify-center">
              PERTAMA
            </div>
            <div className="h-40 bg-yellow-200 flex items-center justify-center">
              content 1
            </div>
            <div className="h-40 bg-yellow-200 flex items-center justify-center">
              content 2
            </div>
            <div className="h-40 bg-yellow-200 flex items-center justify-center">
              content 3
            </div>
            <div className="h-40 bg-yellow-200 flex items-center justify-center">
              content 4
            </div>
            <div className="h-40 bg-yellow-200 flex items-center justify-center">
              content 5
            </div>
            <div className="h-40 bg-yellow-200 flex items-center justify-center">
              TERAKHIR
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="block h-14 md:hidden py-2 px-4 border-t border-muted bottom-0 left-0 right-0 ">
        <h3>footer</h3>
      </footer>
    </div>
  );
};

export default Testing;
