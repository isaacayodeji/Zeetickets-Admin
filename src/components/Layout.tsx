import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen h-screen grid lg:grid-cols-[14rem_1fr] bg-[#FAFAFA] dark:bg-[#121212]">
      <SideBar className="hidden lg:flex" />
      <main
        className={`h-screen grid grid-rows-[4rem_1fr] lg:grid-rows-[4rem_1fr]`}
      >
        <Header />
        <section className=" bg-p-2 md:p-5 md:pr-16 overflow-auto ">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
