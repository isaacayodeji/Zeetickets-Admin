import { lazy } from "react";

const Dashboard = lazy(() => import("../features/Dashboard/Dashboards"));
const Bookings = lazy(() => import("../features/Bookings/Bookings"));
const Tickets = lazy(() => import("../features/Tickets/Tickets"));

export { Bookings, Dashboard, Tickets };
