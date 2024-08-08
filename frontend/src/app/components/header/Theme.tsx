import { MouseEventHandler } from "react";
import Moon from "svg/Moon";
import Sun from "svg/Sun";

interface ThemeSwitchProps {
  theme: string;
  action: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  dimension?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  theme,
  action,
  className,
  dimension = "4rem",
}) => {
  return (
    <button
      id="theme-switcher"
      style={{
        width: dimension,
        height: dimension,
      }}
      className={`grid place-content-center rounded-full bg-button-secondary transition-[opacity] duration-500 ${className}`}
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
