import React, { MouseEventHandler } from "react";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

interface ThemeSwitchProps {
  theme: string;
  action: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  openMenu?: boolean;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  theme,
  action,
  openMenu,
  className,
}) => {
  return (
    <button
      className={`grid h-16 w-16 place-content-center rounded-full bg-button-secondary transition-all duration-300 ease-in-out ${className}`}
      onClick={action}
      // className={`transition-all duration-300 ease-in-out ${
      //   openMenu ? "top-[10rem]" : "top-[5rem]"
      // }  md:top-[5rem] w-[3rem] h-[3rem] flex justify-center items-center dark:bg-[#1F2024] bg-white-1 rounded-full p-2 cursor-pointer`}
    >
      {theme === "dark" ? (
        <span className="rounded-full">
          <MdLightMode className="fill-[#FF7300] text-l" />
        </span>
      ) : (
        <span className="rounded-full">
          <MdOutlineDarkMode className="fill-[#FF7300] text-l" />
        </span>
      )}
    </button>
  );
};

export default ThemeSwitch;
