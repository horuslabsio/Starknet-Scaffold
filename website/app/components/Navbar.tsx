"use client";

import { useEffect } from "react";
import SunIcon from "../svg/SunIcon";
import MoonIcon from "../svg/MoonIcon";

const Navbar = () => {
  useEffect(() => {
    let theme: "dark" | "light";

    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const html = document.getElementsByTagName("html")[0];

    if (systemSettingDark.matches) {
      theme = "dark";
    } else {
      theme = "light";
    }
    html.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    const html = document.getElementsByTagName("html")[0];
    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "light") {
      html.setAttribute("data-theme", "dark");
    } else if (currentTheme === "dark") {
      html.setAttribute("data-theme", "light");
    }
  };

  return (
    <header className=" absolute w-screen top-0 left-0 z-[99] flex justify-between px-5 md:px-12 py-6">
      <a
        href="
          "
        className="inline-block w-[55vw] max-w-[300px]  md:w-[30vw]  lg:w-[20vw]"
      >
        <img src="/logo.svg" alt="starknet scaffold" />
      </a>

      <button
        id="toggle-theme"
        onClick={toggleTheme}
        className="h-[10vw] w-[10vw] max-w-10 max-h-10  p-2 rounded-full  bg-[#2D2D2D] text-[#FF6734] flex justify-center items-center relative overflow-hidden"
      >
        <span id="sun" className="text-[1.5em] md:text-[1.8em]">
          <SunIcon />
        </span>

        <span id="moon" className="absolute text-[1.5em] md:text-[2em]">
          <MoonIcon />
        </span>
      </button>
    </header>
  );
};

export default Navbar;
