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
  dimension = "w-[4rem] h-[4rem]",
}) => {
  return (
    <button
      id="theme-switcher"
      className={`grid place-content-center rounded-full bg-button-secondary transition-[opacity] duration-500 ${dimension} ${className}`}
      onClick={action}
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
