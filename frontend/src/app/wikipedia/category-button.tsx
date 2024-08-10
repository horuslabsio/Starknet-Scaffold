export default function CategoryButton({ category, onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={`h-fit w-fit min-w-fit rounded-lg border-[2px] px-3 py-[6.5px] transition-all hover:bg-[#FFEBDA] hover:text-accent-secondary md:rounded-xl md:px-6 md:py-2 ${
        active
          ? "border-[#FFEBDA] bg-[#FFEBDA] text-accent-secondary"
          : "border-[#F2F2F2] text-[--headings]"
      }`}
    >
      {category}
    </button>
  );
}
