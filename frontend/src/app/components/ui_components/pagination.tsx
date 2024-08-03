import { useRouter, useSearchParams } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const PAGE_SIZE = 10;
export default function Pagination({ count }: { count: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", next.toString());
    router.push(currentUrl.toString());
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("page", prev.toString());
    router.push(currentUrl.toString());
  }

  if (pageCount <= 1) return null;
  return (
    <div className="flex items-center gap-x-[100px] text-[#141925] text-base leading-6 pt-4 border-t-[#F0F2F5] border-t-[2px]">
      <p className="">
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex items-center gap-x-4">
        <button
          className="flex items-center rounded-lg disabled:cursor-not-allowed py-2 px-3 border-[1px] border-[#F2F2F2] gap-x-2"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft /> <span>Previous</span>
        </button>
        <button
          className="flex items-center disabled:cursor-not-allowed rounded-lg py-2 px-3 border-[1px] border-[#F2F2F2] gap-x-2"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}
