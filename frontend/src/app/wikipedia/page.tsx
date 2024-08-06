import { Resource, columns } from "./columns";
import { DataTable } from "./data-table";

import useTheme from "~/ui_components/hooks/useTheme";
import { useEffect, useState } from "react";
import Filter from "./filter";
import Resources from "./resources";
import { useDebounce } from "../hooks";
import { searchResources, wikipediaResources } from "../utils";
import { WikipediaResource } from "../types";
import ThemeSwitch from "../components/ui_components/Theme";

export default async function Page() {
  const data = await getData();

  return (
    <div className="relative w-full bg-background-primary-light dark:bg-background-primary-dark">
      <div className="w-full bg-primary-gradient px-[100px] py-[30px]">
        <div className="relative mb-[95px] flex flex-wrap items-center justify-between">
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
    </div>
  );
}
