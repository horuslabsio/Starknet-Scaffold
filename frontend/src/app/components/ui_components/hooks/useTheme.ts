"use client";
import { useState, useEffect } from "react";

const themeConstant = {
  DARK: "dark",
  LIGHT: "light",
};

export const useTheme = () => {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) return;

    if (
      localStorage.theme === themeConstant.DARK ||
      (!("theme" in localStorage) &&
        window.matchMedia(`(prefers-color-scheme: ${themeConstant.DARK})`)
          .matches)
    ) {
      document.body.setAttribute("data-theme", themeConstant.DARK);
      setTheme(themeConstant.DARK);
    } else {
      document.body.setAttribute("data-theme", themeConstant.LIGHT);
      setTheme(themeConstant.LIGHT);
    }
  }, []);

  const changeTheme = () => {
    if (theme === themeConstant.DARK) {
      localStorage.setItem("theme", themeConstant.LIGHT);
      document.body.setAttribute("data-theme", themeConstant.LIGHT);
      setTheme(themeConstant.LIGHT);
    } else {
      localStorage.setItem("theme", themeConstant.DARK);
      document.body.setAttribute("data-theme", themeConstant.DARK);
      setTheme(themeConstant.DARK);
    }
  };

  return { theme, changeTheme };
};

export default useTheme;
