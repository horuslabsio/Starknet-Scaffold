"use client";
import { useEffect, useState } from "react";
import useTheme from "../components/ui_components/hooks/useTheme";
import { Resource, columns } from "./columns";
import { DataTable } from "./data-table-v1";
import { AddressBookResource } from "../types";
import { addressBookResources, searchResources } from "../utils";
import { useDebounce } from "../hooks";
import ThemeSwitch from "../components/ui_components/Theme";
import Image from "next/image";
import searchIcon from "../../../public/assets/search-icon.svg";
import AddressTable from "./address-table";

export default function Page() {
  const { theme, changeTheme } = useTheme();
  const [addresses] = useState<AddressBookResource[]>(addressBookResources);
  const [filteredAddresses, setFilteredAddresses] = useState<
    AddressBookResource[]
  >([]);
  const [openMenu] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const loadAddresses = async () => {
      const searchResult = debouncedSearch.trim()
        ? await searchResources({
            resources: addresses,
            search: debouncedSearch,
          })
        : [];
      setFilteredAddresses(searchResult);
    };
    loadAddresses();
  }, [debouncedSearch]);

  return (
    <div className="relative w-full bg-background-primary-light dark:bg-background-primary-dark">
      <div className="w-full bg-primary-gradient px-[100px] py-[30px]">
        <div className="relative mb-[95px] flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-x-[9px]">
            <div className="w-[18.75rem]">
              <img
                src="/assets/logo.svg"
                alt="logo"
                className="h-full w-full"
              />
            </div>
            <h4 className="border-l-[1.75px] border-[#141925] px-2 py-1 text-[24px] uppercase italic leading-7 text-[#141925]">
              ADDRESSBOOK
            </h4>
          </div>
          <ThemeSwitch
            className=""
            action={changeTheme}
            theme={theme}
            openMenu={openMenu}
          />
        </div>
        <div className="relative mx-auto w-fit">
          <input
            type="text"
            className="w-[800px] rounded-2xl bg-[#F7F7F7] px-6 py-5 pl-[60px] text-l leading-[30px] text-[#141925] placeholder:text-[#7A7A7A] dark:bg-[#343434] dark:text-[#C4C4C4]"
            placeholder="Search keywords, contract addreses"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Image
            src={searchIcon}
            className="absolute left-6 top-[24px] z-10 h-6 w-6"
            alt="search"
          />
        </div>
      </div>
      <div className="dark:text-text-white-secondary h-full w-full px-9 pb-[74px] pt-4 text-text-secondary">
        <AddressTable
          addresses={
            filteredAddresses.length > 0 && search.length > 0
              ? filteredAddresses
              : addresses
          }
        />
      </div>
    </div>
  );
}
