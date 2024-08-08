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
      style={{
        width: dimension,
        height: dimension,
      }}
      className={`grid place-content-center rounded-full bg-button-secondary transition-all duration-300 ease-in-out ${className}`}
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
