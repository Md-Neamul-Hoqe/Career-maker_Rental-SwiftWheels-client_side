import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Layout = () => {
  return (
    <>
      <header className="min-h-[65px]">
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-265px)]">
        <Outlet />
      </main>
      <footer className="bg-black min-h-[200px]">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
