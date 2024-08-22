import Link from "next/link";
import { AddressBookResource } from "./page";

export default function AddressTableRow({
  address: { name, description, address },
}: {
  address: AddressBookResource;
}) {
  return (
    <Link
      href={address}
      target="_blank"
      rel="noopener noreferrer"
      className="grid w-full cursor-pointer grid-cols-[107px_150px_282px] gap-x-[2px] break-words text-xs text-[--headings] transition-all duration-300 md:grid-cols-[1fr_1.3fr_1.95fr] md:text-md md:hover:rounded md:hover:bg-button-secondary md:hover:text-text-secondary"
    >
      <div className="px-[10px] py-4 underline md:no-underline">{name}</div>
      <div className="px-[10px] py-4">{description}</div>
      <div className="truncate px-[10px] py-4">{address}</div>
    </Link>
  );
}
