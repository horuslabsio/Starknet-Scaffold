"use client";
import { useSearchParams } from "next/navigation";
import ResourceCard from "./resource-card";
import { useEffect, useState } from "react";
import Pagination from "../components/internal/util/pagination";


interface WikipediaResource {
  id: string;
  name: string;
  description: string;
  status: string;
  url: string;
  category: string;
}

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
      <div className="grid w-full grid-cols-1 gap-y-[10px] md:grid-cols-[1fr_1fr_1fr] md:gap-x-5 md:gap-y-6">
        {filteredResources.slice(from, to).map((item: any, i: number) => (
          <ResourceCard key={i} resource={item} />
        ))}
      </div>
      <div className="mt-[34px] flex w-full justify-between md:justify-end">
        <Pagination count={filteredResources.length} />
      </div>
    </div>
  );
}
