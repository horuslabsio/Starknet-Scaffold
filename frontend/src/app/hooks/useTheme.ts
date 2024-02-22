"use client";

import { useState, useEffect } from "react";
import { themeConstant } from "../utils/constant";

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
      document.documentElement.classList.add(themeConstant.DARK);
      setTheme(themeConstant.DARK);
    } else {
      setTheme(themeConstant.LIGHT);
    }
  }, []);

  const changeTheme = () => {
    if (theme === themeConstant.DARK) {
      localStorage.setItem("theme", themeConstant.LIGHT);
      document.documentElement.classList.remove(themeConstant.DARK);
      setTheme(themeConstant.LIGHT);
    } else {
      localStorage.setItem("theme", themeConstant.DARK);
      document.documentElement.classList.add(themeConstant.DARK);
      setTheme(themeConstant.DARK);
    }
  };

  return { theme, changeTheme };
};

export default useTheme;
