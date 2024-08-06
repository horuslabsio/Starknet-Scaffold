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
    <div className="bg-white relative h-fit min-h-[100vh] w-full font-coolvetica dark:bg-[#1f1f1e]">
      <div className="bg-primaryGradient w-full px-[100px] py-[30px]">
        <div className="mb-[95px] flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-x-[9px]">
            <Image src={logoImage} alt="logo" width={360} height={48} />
            <h4 className="border-l-[1.75px] border-[#141925] px-2 py-1 text-[24px] uppercase italic leading-7 text-[#141925]">
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
        <div className="relative mx-auto w-fit">
          <input
            type="text"
            className="placeholder:text-[ #7A7A7A] w-[800px] rounded-2xl bg-[#F7F7F7] px-6 py-5 pl-[60px] font-coolvetica text-xl leading-[30px] text-[#141925]"
            placeholder="Search keywords, links"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Image
            src={searchIcon}
            className="absolute left-6 top-[22px] z-10"
            alt="search"
          />
        </div>
      </div>
      <div className="dark:text-white grid h-full w-full grid-cols-[315px_1fr] gap-y-[54px] px-8 pb-[74px] pt-8 text-[#141925]">
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
      <div className="bg-[#141925] p-6">
        <p className="text-center text-[#BC988C]">Built with ❤️ by Argent</p>
      </div>
    </div>
  );
}
