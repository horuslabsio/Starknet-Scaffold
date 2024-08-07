import { useRouter, useSearchParams } from "next/navigation";
import sortIcon from "../../../public/assets/sortIcon.svg";
import Sort from "svg/Sort";

export default function AddressTableHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortBy = searchParams.get("sortBy") || "";

  function handleSort() {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", "1");
    if (sortBy === "" || sortBy === "name-desc") {
      currentUrl.searchParams.set("sortBy", "name-asc");
    } else if (sortBy === "name-asc") {
      currentUrl.searchParams.set("sortBy", "name-desc");
    }
    router.push(currentUrl.toString());
  }
  return (
    <div className="grid grid-cols-[1fr_1.3fr_1.95fr] gap-x-[2px] text-sm">
      <div className="bg-grey-light-primary dark:bg-orange-accent-primary flex items-center gap-x-3 rounded-tl-[12px] px-[10px] py-4">
        Name{" "}
        <button onClick={handleSort}>
          <Sort />
        </button>
      </div>
      <div className="bg-grey-light-primary dark:bg-orange-accent-primary flex items-center gap-x-3 rounded-tl-[12px] px-[10px] py-4">
        Description
      </div>
      <div className="bg-grey-light-primary dark:bg-orange-accent-primary flex items-center gap-x-3 rounded-tr-[12px] px-[10px] py-4">
        Address
      </div>
    </div>
  );
}
