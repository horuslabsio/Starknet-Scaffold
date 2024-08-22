"use client";
import { useSearchParams } from "next/navigation";
import AddressTableHeader from "./address-table-header";
import AddressTableRow from "./address-table-row";
import { useEffect, useState } from "react";
import { AddressBookResource } from "./page";
import Pagination from "../components/internal/util/pagination";

function AddressTable({ addresses }: { addresses: AddressBookResource[] }) {
  const searchParams = useSearchParams();

  const [filteredAddresses, setFilteredAddresses] = useState<
    AddressBookResource[]
  >([]);

  const page = searchParams.get("page") || "1";
  const sortBy = searchParams.get("sortBy") || "";

  const from = (+page - 1) * 10;
  const to = from + 10;

  useEffect(() => {
    let result = addresses;

    if (sortBy === "name-asc") {
      result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result = result.slice().sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredAddresses(result);
  }, [addresses, sortBy]);

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <AddressTableHeader />
        <div className="flex flex-col gap-y-3 py-1 md:gap-y-[2px] md:py-4">
          {filteredAddresses.slice(from, to).map((address) => (
            <AddressTableRow address={address} key={address.id} />
          ))}
        </div>
      </div>
      <div className="mt-[34px] flex w-full justify-end">
        <Pagination count={filteredAddresses.length} />
      </div>
    </div>
  );
}

export default AddressTable;
