import CategoryButton from "./category-button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoFilter } from "react-icons/io5";
import SortBy from "~/ui_components/SortBy";

export default function Filter({
  field,
  options,
}: {
  field: string;
  options: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get(field) || "";

  function handleClick(value: string) {
    const currentUrl = new URL(window.location.href);

    const isCurrentCategory = currentCategory === value;

    if (isCurrentCategory) {
      currentUrl.searchParams.delete(field);
    } else {
      currentUrl.searchParams.set(field, value);
    }

    currentUrl.searchParams.set("page", "1");
    currentUrl.searchParams.delete("sortBy");

    router.push(currentUrl.toString());
  }
  return (
    <div className="pr-3 text-md">
      <div className="border-b-solid flex w-full flex-row-reverse items-center justify-between border-b-[1.5px] border-b-[#F0F2F5] pb-3 md:mb-6 md:flex-col md:items-start md:border-none">
        <div className="flex items-center gap-x-3 md:mb-6">
          <h3 className="hidden md:inline-block">Sort by:</h3>
          <SortBy
            options={[
              { value: "", label: "Default Sorting" },
              { value: "name-asc", label: "Sort by name (A-Z)" },
              { value: "name-desc", label: "Sort by name (Z-A)" },
            ]}
          />
        </div>
        <div className="flex items-center gap-x-2 rounded-[10px] border-[2px] border-[#F2F2F2] px-4 py-2 text-[--headings] md:gap-x-3 md:border-none md:px-2 md:py-3">
          <IoFilter />
          Filters
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:w-[full]">
        <div className="mb-2 hidden w-full items-center justify-between px-[7px] py-3 text-[--headings] md:flex">
          Categories
        </div>
        <div className="flex w-full gap-3 overflow-x-auto pb-3 md:flex-wrap md:gap-4">
          {options.map((option: any) => (
            <CategoryButton
              category={option.label}
              key={option.value}
              onClick={() => handleClick(option.value)}
              active={option.value === currentCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
