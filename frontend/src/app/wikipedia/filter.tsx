import Image from "next/image";
import CategoryButton from "./category-button";
import arrDown from "../../../public/assets/cheveron-down.svg";
import filterIcon from "../../../public/assets/filter-icon.svg";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
    currentUrl.searchParams.set(field, value);
    currentUrl.searchParams.set("page", "1");
    router.push(currentUrl.toString());
  }
  return (
    <div className="text-xl leading-[30px] text-[#141925]  pr-3">
      <div className="flex items-center gap-x-3 mb-6">
        <h3 className="text-[#7A7A7A]">Sort by:</h3>
        <div className="flex gap-x-4 py-3 px-6 border-[2px] border-[#F2F2F2] rounded-xl">
          Popular
          <Image src={arrDown} alt="cheveron" />
        </div>
      </div>
      <div className="flex items-center py-3 px-2 gap-x-3">
        <Image src={filterIcon} alt="filter" />
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
              disabled={option.value === currentCategory}
              active={option.value === currentCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
