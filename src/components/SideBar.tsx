import React from "react";
import MenuItems from "./MenuItems";
import { Typography } from "antd";

const SideBar: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <nav
      className={`border-r dark:border-[#1F1F1F] overflow-hidden border-[#F1F1F1] dark:bg-primary-dark h-screen relative ${className} flex-col justify-between`}
    >
      <div className="grid gap-5 lg:overflow-hidden mb-5">
        <div className="flex items-center justify-center p-5">
          <Typography className="font-inter-bold text-xl">Zeetickets</Typography>
        </div>
        <MenuItems />
      </div>
      <div className="absolute bottom-0 p-5 hidden lg:block">
        <Typography
          className="!font-inter-medium text-gray-text !text-[11px]"
          style={{ width: "99%" }}
        >
          Zeetickets Solutions Limited - Licensed by the Central Bank of
          Nigeria
        </Typography>
      </div>
    </nav>
  );
};

export default SideBar;
