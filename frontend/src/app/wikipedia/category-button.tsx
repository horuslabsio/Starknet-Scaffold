export default function CategoryButton({ category, onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-fit rounded-xl border-[2px] px-6 py-2 text-[#141925] transition-all hover:bg-[#FFEBDA] ${
        active ? "border-[#FFEBDA] bg-[#FFEBDA]" : "bg-white border-[#F2F2F2]"
      }`}
    >
      {category}
    </button>
  );
}
