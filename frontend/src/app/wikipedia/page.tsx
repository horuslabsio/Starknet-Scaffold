"use client";
import Image from "next/image";
import logoImage from "../../../public/assets/logo.svg";
import searchIcon from "../../../public/assets/search-icon.svg";

import useTheme from "~/ui_components/hooks/useTheme";
import ThemeSwitch from "~/ui_components/Theme";
import { useEffect, useState } from "react";
import Filter from "./filter";
import Resources from "./resources";
import { useDebounce } from "../hooks";
import { searchResources, wikipediaResources } from "../utils";
import { WikipediaResource } from "../types";

export default function Page() {
  const { theme, changeTheme } = useTheme();
  const [resources] = useState<WikipediaResource[]>(wikipediaResources);
  const [filteredResources, setFilteredResources] = useState<
    WikipediaResource[]
  >([]);
  const [openMenu] = useState(false);
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
    <div className="min-h-[100vh] h-fit w-full  bg-white dark:bg-[#1f1f1e] relative font-coolvetica">
      <div className="w-full bg-primaryGradient py-[30px] px-[100px]">
        <div className="flex flex-wrap justify-between items-center mb-[95px]">
          <div className="flex items-center gap-x-[9px]">
            <Image src={logoImage} alt="logo" width={360} height={48} />
            <h4 className="text-[24px] leading-7 text-[#141925] uppercase italic px-2 py-1 border-l-[1.75px] border-[#141925]">
              wikipedia
            </h4>
          </div>
          <ThemeSwitch
            className=""
            action={changeTheme}
            theme={theme}
            openMenu={openMenu}
          />
        </div>
        <div className="relative w-fit mx-auto">
          <input
            type="text"
            className="py-5 text-xl leading-[30px] px-6 pl-[60px] bg-[#F7F7F7] placeholder:text-[
              #7A7A7A] rounded-2xl w-[800px] font-coolvetica text-[#141925]"
            placeholder="Search keywords, links"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Image
            src={searchIcon}
            className="absolute top-[22px] left-6 z-10"
            alt="search"
          />
        </div>
      </div>
      <div className="w-full h-full text-[#141925] dark:text-white grid grid-cols-[315px_1fr] gap-y-[54px] pt-8 px-8 pb-[74px]">
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
    </div>
  );
}
