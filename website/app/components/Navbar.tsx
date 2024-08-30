"use client";
import { useEffect } from "react";
import SunIcon from "../svg/SunIcon";
import MoonIcon from "../svg/MoonIcon";

const Navbar = () => {
  const toggleTheme = () => {
    const html = document.getElementsByTagName("html")[0];
    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "light") {
      html.setAttribute("data-theme", "dark");
    } else if (currentTheme === "dark") {
      html.setAttribute("data-theme", "light");
    }
  };
  useEffect(() => {
    let theme: "dark" | "light";
    const queryMedia = window.matchMedia("(prefers-color-scheme: dark)");

    const html = document.getElementsByTagName("html")[0];
    if (queryMedia.matches) {
      theme = "dark";
    } else {
      theme = "light";
    }
    html.setAttribute("data-theme", theme);

    queryMedia.addEventListener("change", () => {
      toggleTheme();
    });

    return () => {
      queryMedia.removeEventListener("change", () => {
        toggleTheme();
      });
    };
  }, []);

  return (
    <header className="max-w-[2000px]  left-1/2 -translate-x-1/2  absolute w-screen top-0 z-[99] flex justify-between px-5 md:px-12 py-6">
      <div className="inline-block w-[55vw] max-w-[300px]  md:w-[30vw]  lg:w-[20vw]">
        <img src="/logo.png" alt="starknet scaffold" />
      </div>

      <button
        id="toggle-theme"
        onClick={toggleTheme}
        className="h-[10vw] w-[10vw] max-w-10 max-h-10  p-2 rounded-full  bg-[#2D2D2D] text-[#FF6734] flex justify-center items-center relative overflow-hidden"
      >
        <span id="sun" className="text-[1.2em] md:text-[1.5em]">
          <SunIcon />
        </span>

        <span id="moon" className="absolute text-[1.2em] md:text-[1.5em]">
          <MoonIcon />
        </span>
      </button>
    </header>
  );
};

export default Navbar;
