import { Suspense } from "react";
import PageLoader from "./components/PageLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="dark:bg-primary-dark">
          <PageLoader />
        </div>
      }
    >
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
};
export default App;
