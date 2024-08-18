import { useEffect, useState } from "react";
import Check from "svg/Check";
import Copy from "svg/Copy";

type Props = {
  copyText: string;
  buttonText?: string;
  className?: string;
  iconClassName?: string;
};

function CopyButton({
  copyText,
  buttonText,
  className = "rounded-full bg-[--link-card] p-1 text-yellow-primary dark:bg-black",
  iconClassName = "",
}: Props) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(id);
  }, [isCopied]);

  function handleCopyClick() {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
  }

  if (!copyText) {
    return null;
  }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleCopyClick();
      }}
      className={className}
    >
      <span>{buttonText}</span>
      <span className={iconClassName}>{isCopied ? <Check /> : <Copy />}</span>
    </button>
  );
}

export default CopyButton;
