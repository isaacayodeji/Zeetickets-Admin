import { useTheme } from "../components/ThemeProviderComponent";
import { useCallback } from "react";
import { Bounce, toast } from "react-toastify";

const useToast = () => {
  const { themeMode } = useTheme();

  const onNotify = useCallback(
    (type: "success" | "error" | "info" | "warning", message: string) =>
      toast(message, {
        type,
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: themeMode === "light" ? "light" : "dark",
        transition: Bounce,
      }),
    [themeMode]
  );

  return onNotify;
};

export default useToast;