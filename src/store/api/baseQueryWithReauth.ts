import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Bounce, toast } from "react-toastify";

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

export const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === "FETCH_ERROR") {
      toast("No network connectivity, reload page", {
        type: "error",
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("theme") === "light" ? "light" : "dark",
        transition: Bounce,
        onClick: () => {
          window.location.reload();
        },
      });
    }

    return result;
  };
