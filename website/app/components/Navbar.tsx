"use client";

import { useEffect } from "react";

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
        className="inline-block w-[40vw] md:w-[30vw]  lg:w-[20vw]"
      >
        <img src="/logo.svg" alt="starknet scaffold" />
      </a>

      <button
        id="toggle-theme"
        onClick={toggleTheme}
        className="w-10 h-10  p-2 rounded-full  bg-[#2D2D2D] text-[#FF6734] hidden md:flex justify-center items-center relative"
      >
        <span id="sun" className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.8em"
            height="1.8em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m10-6h1M12 2V1m0 22v-1m8-2l-1-1m1-15l-1 1M4 20l1-1M4 4l1 1m-4 7h1"
            />
          </svg>
        </span>

        <span id="moon" className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56"
            />
          </svg>
        </span>
      </button>
    </header>
  );
};

export default Navbar;
