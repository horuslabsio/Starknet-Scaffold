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
  console.log(theme);

  return (
    <button
      className={`grid h-16 w-16 place-content-center rounded-full bg-button-secondary transition-all duration-300 ease-in-out ${className}`}
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
