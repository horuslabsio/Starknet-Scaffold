import { useSearchParams, useRouter } from "next/navigation";
import Select from "./Select";

export default function SortBy({ options }: { options: any }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: any) {
    const currentUrl = new URL(window.location.href);
    if (e.target.value === "") {
      currentUrl.searchParams.delete("sortBy");
      router.push(currentUrl.toString());
      return;
    }
    currentUrl.searchParams.set("sortBy", e.target.value);
    currentUrl.searchParams.set("page", "1");
    router.push(currentUrl.toString());
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}
