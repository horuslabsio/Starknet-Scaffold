import { useEffect, useState } from "react";
import Check from "svg/Check";
import Copy from "svg/Copy";

type Props = {
  data: string;
};

function CopyButton({ data }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsCopied(false);
    }, 1500);

    return () => clearTimeout(id);
  }, [isCopied]);

  function handleCopyClick() {
    if (!data) return;
    navigator.clipboard.writeText(data);
    setIsCopied(true);
  }

  if (!data) {
    return null;
  }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleCopyClick();
      }}
      className="rounded-full bg-[--link-card] p-1 text-yellow-primary dark:bg-black"
    >
      {isCopied ? (
        <span className="text-md">
          <Check />
        </span>
      ) : (
        <span>
          <Copy />
        </span>
      )}
    </button>
  );
}

export default CopyButton;
