export default function CategoryButton({ category, onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-fit rounded-xl border-[1px] px-6 py-2 transition-all hover:bg-[#FFEBDA] hover:text-accent-secondary ${
        active
          ? "border-[#FFEBDA] bg-[#FFEBDA] text-accent-secondary"
          : "border-[#F2F2F2] text-[--headings]"
      }`}
    >
      {category}
    </button>
  );
}
