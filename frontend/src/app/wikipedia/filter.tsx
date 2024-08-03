import CategoryButton from "./category-button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";

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
    if (currentCategory === value) {
      currentUrl.searchParams.delete(field, value);
      currentUrl.searchParams.set("page", "1");
      router.push(currentUrl.toString());
      return;
    }
    currentUrl.searchParams.set(field, value);
    currentUrl.searchParams.set("page", "1");
    router.push(currentUrl.toString());
  }
  return (
    <div className="text-xl leading-[30px] pr-3">
      <div className="flex items-center gap-x-3 mb-6">
        <h3 className="text-[#7A7A7A]">Sort by:</h3>
        <div className="flex gap-x-4 py-3 px-6 items-center border-[2px] border-[#F2F2F2] rounded-xl">
          Popular
          <FaChevronDown />
        </div>
      </div>
      <div className="flex items-center py-3 px-2 gap-x-3">
        <IoFilter />
        Filters
      </div>
      <div>
        <div className="w-full py-3 px-[7px] flex items-center justify-between mb-2">
          Categories
        </div>
        <div className="flex flex-wrap gap-[6px]">
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
