import { createBrowserRouter } from "react-router-dom";

import { routerPath } from "./helper";
import { Bookings, Dashboard, Tickets } from "./lazyComponents";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: routerPath.Dashboard,
        Component: Dashboard,
      },
      {
        path: routerPath.Bookings,
        Component: Bookings,
      },
      {
        path: routerPath.Tickets,
        Component: Tickets,
      },
    ],
  },
]);
