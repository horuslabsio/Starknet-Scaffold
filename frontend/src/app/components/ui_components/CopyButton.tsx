import Image from "next/image";
import { useEffect, useState } from "react";

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
      className="dark:bg-black p-1 rounded-sm bg-[#333]"
    >
      <Image
        src={isCopied ? "/assets/tick.svg" : "/assets/copy.svg"}
        width={20}
        height={20}
        alt="#"
      />
    </button>
  );
}

export default CopyButton;
