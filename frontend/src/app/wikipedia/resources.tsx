"use client";
import { useSearchParams } from "next/navigation";
import Pagination from "../components/ui_components/pagination";
import ResourceCard from "./resource-card";
import { useEffect, useState } from "react";

export default function Resources({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const [filteredResources, setFilteredResources] = useState([]);
  // 1. FILTER
  const category = searchParams.get("category") || "all";
  const page = searchParams.get("page") || "1";

  const from = (+page - 1) * 10;
  const to = from + (10 - 1);

  useEffect(() => {
    if (category === "all") {
      setFilteredResources(data);
    }
    if (category === "tutorials") {
      setFilteredResources(
        data.filter((resource: any) => resource.category === "tutorials"),
      );
    }
    if (category === "blogs") {
      setFilteredResources(
        data.filter((resource: any) => resource.category === "blogs"),
      );
    }
    if (category === "plugins") {
      setFilteredResources(
        data.filter((resource: any) => resource.category === "plugins"),
      );
    }
    if (category === "sdk") {
      setFilteredResources(
        data.filter((resource: any) => resource.category === "sdk"),
      );
    }
    if (category === "documentation") {
      setFilteredResources(
        data.filter((resource: any) => resource.category === "documentation"),
      );
    }
    if (category === "official-website") {
      setFilteredResources(
        data.filter(
          (resource: any) => resource.category === "official-website",
        ),
      );
    }
  }, [category]);

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
