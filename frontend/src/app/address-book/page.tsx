"use client";
import { useEffect, useState } from "react";
import useTheme from "../components/ui_components/hooks/useTheme";
import logoImage from "../../../public/assets/logo.svg";
import { AddressBookResource } from "../types";
import { addressBookResources, searchResources } from "../utils";
import { useDebounce } from "../hooks";
import Image from "next/image";
import searchIcon from "../../../public/assets/search-icon.svg";
import AddressTable from "./address-table";
import ThemeSwitch from "../components/header/Theme";

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
    <div className="relative w-full">
      <div className="w-full bg-[url('/assets/header-bg.svg')] bg-cover bg-[0px] bg-no-repeat px-6 py-8 md:px-24 md:py-10">
        <div className="mx-auto max-w-[--header-max-w]">
          <div className="relative mb-[87px] flex flex-wrap items-center justify-between md:mb-[95px]">
            <div className="flex items-center gap-x-[3.76px] md:gap-x-[9px]">
              <Image
                src={logoImage}
                alt="logo"
                className="h-[20.5px] w-[153px] md:h-[48px] md:w-[360px]"
              />
              <h4 className="border-l-[1.25px] border-[#141925] px-1 py-[2px] text-xs uppercase italic leading-[14px] text-accent-secondary md:border-l-[1.75px] md:px-2 md:py-1 md:text-[24px] md:leading-7">
                addressbook
              </h4>
            </div>
            <ThemeSwitch className="grid" action={changeTheme} theme={theme} />
          </div>
          <div className="relative mx-auto md:w-fit">
            <input
              type="text"
              className="w-full rounded-[10px] bg-[#F7F7F7] px-4 py-3 pl-10 text-base text-accent-secondary placeholder:text-text-primary md:w-[800px] md:rounded-[16px] md:px-6 md:py-5 md:pl-[60px] md:text-l md:leading-[30px]"
              placeholder="Search keywords, contract addreses"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Image
              src={searchIcon}
              className="absolute left-4 top-[14px] z-10 h-5 w-5 md:left-6 md:top-6 md:h-6 md:w-6"
              alt="search"
            />
          </div>
        </div>
      </div>
      <div className="h-full px-4 pb-6 pt-3 text-[--headings] md:px-9 md:pb-[74px] md:pt-4">
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
