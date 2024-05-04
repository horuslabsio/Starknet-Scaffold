import React, { MouseEventHandler } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

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
      onClick={action}
      className={`transition-all duration-300 ease-in-out ${
        openMenu ? "top-[10rem]" : "top-[5rem]"
      }  md:top-[5rem] w-[3rem] h-[3rem] flex justify-center items-center dark:bg-[#1F2024] bg-white-1 rounded-full p-2 cursor-pointer`}
    >
      {theme === "dark" ? (
        <span>
          <MdOutlineLightMode className="font-black text-white-1" />
        </span>
      ) : (
        <span>
          <MdOutlineDarkMode className="font-black" />
        </span>
      )}
    </button>
  );
};

export default ThemeSwitch;
