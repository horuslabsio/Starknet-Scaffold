import { MouseEventHandler } from "react";
import Moon from "svg/Moon";
import Sun from "svg/Sun";

interface ThemeSwitchProps {
  theme: string;
  action: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  theme,
  action,
  className,
}) => {
  return (
    <button
      id="theme-switcher"
      className={`grid h-[3rem] w-[3rem] place-content-center rounded-full bg-button-secondary transition-[opacity] duration-500 md:h-[3.5rem] md:w-[3.5rem] lg:h-[4rem] lg:w-[4rem] ${className}`}
      onClick={action}
      // className={`transition-all duration-300 ease-in-out ${
      //   openMenu ? "top-[10rem]" : "top-[5rem]"
      // }  md:top-[5rem] w-[3rem] h-[3rem] flex justify-center items-center dark:bg-[#1F2024] bg-white-1 rounded-full p-2 cursor-pointer`}
    >
      {theme === "dark" ? (
        <span className="text-l">
          <Sun />
        </span>
      ) : (
        <span className="text-l">
          <Moon />
        </span>
      )}
    </button>
  );
};

export default ThemeSwitch;
