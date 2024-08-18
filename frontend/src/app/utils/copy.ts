import { SetStateAction } from "react";

export function handleCopyClick({
  text,
  setIsCopied,
}: {
  text: string;
  setIsCopied: (value: SetStateAction<boolean>) => void;
}) {
  if (!text) return;
  navigator.clipboard.writeText(text);
  setIsCopied(true);
}
