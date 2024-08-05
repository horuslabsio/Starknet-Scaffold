"use client";
import { useSearchParams } from "next/navigation";
import Pagination from "~/ui_components/pagination";
import ResourceCard from "./resource-card";
import { useEffect, useState } from "react";
import { WikipediaResource } from "../types";

export default function Resources({ data }: { data: WikipediaResource[] }) {
  const searchParams = useSearchParams();

  const [filteredResources, setFilteredResources] = useState<
    WikipediaResource[]
  >([]);

  const category = searchParams.get("category") || "all";
  const page = searchParams.get("page") || "1";
  const sortBy = searchParams.get("sortBy") || "";

  const from = (+page - 1) * 10;
  const to = from + 10;

  useEffect(() => {
    let result =
      category === "all"
        ? data
        : data.filter((resource) => resource.category === category);

    if (sortBy === "name-asc") {
      result = result.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result = result.slice().sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredResources(result);
  }, [category, data, sortBy]);
  return (
    <div>
      <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-5 gap-y-6 w-full">
        {filteredResources.slice(from, to).map((item: any, i: number) => (
          <ResourceCard key={i} resource={item} />
        ))}
      </div>
      <div className="flex justify-end w-full mt-[34px]">
        <Pagination count={filteredResources.length} />
      </div>
    </div>
  );
}
