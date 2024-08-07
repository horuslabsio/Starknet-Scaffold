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
      <div className="mb-6 flex items-center gap-x-3">
        <h3>Sort by:</h3>
        <SortBy
          options={[
            { value: "", label: "Default Sorting" },
            { value: "name-asc", label: "Sort by name (A-Z)" },
            { value: "name-desc", label: "Sort by name (Z-A)" },
          ]}
        />
      </div>
      <div className="flex items-center gap-x-3 px-2 py-3 text-[--headings]">
        <IoFilter />
        Filters
      </div>
      <div>
        <div className="mb-2 flex w-full items-center justify-between px-[7px] py-3 text-[--headings]">
          Categories
        </div>
        <div className="flex flex-wrap gap-4">
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
