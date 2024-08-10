import { Resource, columns } from "./columns";
import { DataTable } from "./data-table";

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
      <div className="w-full bg-[url('/assets/header-bg.svg')] bg-cover bg-[0px] bg-no-repeat px-6 py-8 md:px-24 md:py-10">
        <div className="mx-auto max-w-[--header-max-w]">
          <div className="relative mb-[87px] flex flex-wrap items-center justify-between md:mb-[95px]">
            <div className="flex items-center gap-x-[3.76px] md:gap-x-[9px]">
              <Image
                src={logoImage}
                alt="logo"
                className="h-[20.5px] w-[153px] md:h-[48px] md:w-[360px]"
              />
              <h4 className="border-l-[1.25px] border-[#141925] px-1 py-[2px] text-xs uppercase italic leading-[14px] text-[#141925] md:border-l-[1.75px] md:px-2 md:py-1 md:text-[24px] md:leading-7">
                wikipedia
              </h4>
            </div>
            <ThemeSwitch className="grid" action={changeTheme} theme={theme} />
          </div>
          <div className="relative mx-auto md:w-fit">
            <input
              type="text"
              className="w-full rounded-[10px] bg-[#F7F7F7] px-4 py-3 pl-10 text-base text-[#141925] placeholder:text-[#7A7A7A] md:w-[800px] md:rounded-2xl md:px-6 md:py-5 md:pl-[60px] md:text-l md:leading-[30px]"
              placeholder="Search keywords, links"
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

      <div className="grid h-full w-[100%] grid-cols-1 gap-y-6 px-6 pb-6 pt-4 md:grid-cols-[315px_1fr] md:gap-y-[54px] md:px-8 md:pb-[74px] md:pt-8 dark:text-white">
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
