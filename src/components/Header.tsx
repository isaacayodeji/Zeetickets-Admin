import { SunOutlined, MoonOutlined, MenuOutlined } from "@ant-design/icons";
import { useTheme } from "./ThemeProviderComponent";
import NotificationSvg from "../assets/icons/NotificationSvg";
import SideBar from "./SideBar";
import { useState } from "react";
import { Avatar, Drawer, Typography } from "antd";

const Header = () => {
  const { themeMode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="dark:border-b dark:border-b-[#1F1F1F] dark:bg-primary-dark flex items-center px-2 md:px-5 justify-between relative">
      <MenuOutlined
        onClick={() => setOpen(true)}
        className="lg:!hidden dark:text-[#FFFFFF]"
      />
      <div className="flex items-center w-full justify-end lg:justify-between">
        <Typography className="lg:flex items-center gap-3 hidden">
          <b>Welcome</b> Matthew Olajuwon
        </Typography>

        <div className="flex items-center gap-5 justify-end">
          <NotificationSvg
            color={themeMode === "dark" ? "#FFFFFF" : "#000000"}
          />
          <button onClick={toggleTheme}>
            {themeMode === "dark" ? (
              <SunOutlined className="text-[#FFFFFF]" />
            ) : (
              <MoonOutlined />
            )}
          </button>
          <button type="button" className="items-center hidden sm:flex gap-1">
            <Avatar
              size={45}
              className="bg-[#006F011A] font-inter-bold text-primary"
            >
              MO
            </Avatar>
            {/* <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              rootClassName="w-44 mt-20"
            >
              <CaretDownOutlined className="dark:text-[#FFFFFF] mt-3" />
            </Dropdown> */}
          </button>
        </div>
      </div>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        closable={false}
        width="75%"
      >
        <SideBar />
      </Drawer>
    </header>
  );
};

export default Header;
