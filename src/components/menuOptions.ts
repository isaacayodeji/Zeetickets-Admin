import React from "react";
import { routerPath } from "../utils/helper";
import HomeSvg from "../assets/icons/HomeSvg";
import BookingSvg from "../assets/icons/BookingSvg";
import TicketSvg from "../assets/icons/TicketSvg";

export interface MenuListProps {
  label: string;
  path?: string;
  icon?: React.FC<{
    color: string;
  }>;
  children?: MenuListProps[];
}

export const menuList: MenuListProps[] = [
  {
    label: "Dashboard",
    path: routerPath.Dashboard,
    icon: HomeSvg,
  },
  {
    label: "Bookings",
    icon: BookingSvg,
    path: routerPath.Bookings,
  },
  {
    label: "Tickets",
    icon: TicketSvg,
    path: routerPath.Tickets,
  },
];
