import { MouseEventHandler } from "react";
import Moon from "svg/Moon";
import Sun from "svg/Sun";

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
      className={`absolute bottom-[-250%] left-1/2 grid h-16 w-16 place-content-center rounded-full bg-button-secondary`}
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
