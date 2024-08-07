import { AddressBookResource } from "../types";

export default function AddressTableRow({
  address: { name, description, address },
}: {
  address: AddressBookResource;
}) {
  return (
    <div className="dark:text-text-white-secondary grid w-full grid-cols-[1fr_1.3fr_1.95fr] gap-x-[2px] text-md text-text-secondary">
      <div className="px-[10px] py-4">{name}</div>
      <div className="px-[10px] py-4">{description}</div>
      <div className="truncate px-[10px] py-4">{address}</div>
    </div>
  );
}
