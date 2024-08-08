import { AddressBookResource } from "../types";
import Link from "next/link";

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
      className="grid w-full cursor-pointer grid-cols-[1fr_1.3fr_1.95fr] gap-x-[2px] text-md text-[--headings] transition-all duration-300 hover:rounded hover:bg-button-secondary hover:text-text-secondary"
    >
      <div className="px-[10px] py-4">{name}</div>
      <div className="px-[10px] py-4">{description}</div>
      <div className="truncate px-[10px] py-4">{address}</div>
    </Link>
  );
}
