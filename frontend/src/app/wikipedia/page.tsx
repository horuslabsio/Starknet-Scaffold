"use client";
import Image from "next/image";
import logoImage from "../../../public/assets/logo.svg";
import searchIcon from "../../../public/assets/search-icon.svg";

import useTheme from "~/ui_components/hooks/useTheme";
import { useEffect, useState } from "react";
import Filter from "./filter";
import Resources from "./resources";
import { useDebounce } from "../hooks";
import { searchResources, wikipediaResources } from "../utils";
import { WikipediaResource } from "../types";
import ThemeSwitch from "../components/header/Theme";

export default function Page() {
  const { theme, changeTheme } = useTheme();
  const [resources] = useState<WikipediaResource[]>(wikipediaResources);
  const [filteredResources, setFilteredResources] = useState<
    WikipediaResource[]
  >([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const loadResources = async () => {
      const searchResult = debouncedSearch.trim()
        ? await searchResources({ resources, search: debouncedSearch })
        : [];
      setFilteredResources(searchResult);
    };
    loadResources();
  }, [debouncedSearch]);

  return (
    <section className="relative w-full">
      <div className="w-full bg-[url('/assets/header-bg.svg')] bg-cover bg-[0px] bg-no-repeat px-24 py-10">
        <div className="mx-auto max-w-[--header-max-w]">
          <div className="relative mb-[95px] flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-x-[9px]">
              <Image src={logoImage} alt="logo" width={360} height={48} />
              <h4 className="border-l-[1.75px] border-[#141925] px-2 py-1 text-[24px] uppercase italic leading-7 text-[#141925]">
                wikipedia
              </h4>
            </div>
            <ThemeSwitch className="" action={changeTheme} theme={theme} />
          </div>
          <div className="relative mx-auto w-fit">
            <input
              type="text"
              className="w-[800px] rounded-2xl bg-[#F7F7F7] px-6 py-5 pl-[60px] text-l leading-[30px] text-[#141925] placeholder:text-[#7A7A7A]"
              placeholder="Search keywords, links"
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
      </div>

      <div className="mx-auto grid h-full w-full max-w-[2000px] grid-cols-[315px_1fr] gap-y-[54px] px-8 pb-[74px] pt-8 dark:text-white">
        <Filter
          field="category"
          options={[
            { value: "tutorials", label: "Tutorials" },
            { value: "plugins", label: "Plugins" },
            { value: "blogs", label: "Blogs" },
            { value: "official-website", label: "Official Website" },
            { value: "documentation", label: "Documentation" },
            { value: "sdk", label: "SDK" },
            { value: "community", label: "Community" },
          ]}
        />
        <Resources
          data={
            filteredResources.length > 0 && search.length > 0
              ? filteredResources
              : resources
          }
        />
      </div>
    </section>
  );
}
