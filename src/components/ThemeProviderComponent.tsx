import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { ConfigProvider, ThemeConfig, theme as themeAntd } from "antd";

interface MyComponentProps {
  children: ReactNode;
}

interface ThemeContextType {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const defaultValue: ThemeContextType = {
  themeMode: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

// Helper functions
const applyTheme = (theme: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
};

export const ThemeProviderComponent: React.FC<MyComponentProps> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const osPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    return storedTheme || osPreference;
  });

  useEffect(() => {
    // Listen for OS theme changes and always prioritize it
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      const osTheme = event.matches ? "dark" : "light";
      setThemeMode(osTheme);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
  
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []); // <-- This runs only once, avoiding re-runs based on themeMode
  
  // Apply theme whenever themeMode changes
  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]); // <-- This effect only focuses on applying the theme

  const antdTheme: ThemeConfig = {
    token: {
      colorPrimary: "#006F01",
    },
    algorithm:
      themeMode === "dark"
        ? themeAntd.darkAlgorithm
        : themeAntd.defaultAlgorithm,
        components: {
          Button: {
            paddingBlock: 20,
            paddingInline: 20,
            fontSize: 13
          },
          Input: {
            controlHeight: 40,
            colorFillAlter: "#006f01",
            colorBorder: themeMode === "dark" ? "#444444" : "#E8E8E8",
            colorBgContainer: themeMode === "dark" ? "#1F1F1F" : "#FFFFFF",
          },
          Select: {
            controlHeight: 40,
            boxShadow: "none",
            controlOutline: "none",
            fontSize: 13
          },
          Table: {
            fontSize: 12
          }
        }
  };

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
