export default function CategoryButton({ category, onClick, active }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-fit py-2 px-6 rounded-xl text-[#141925] hover:bg-[#FFEBDA] transition-all border-[2px] ${
        active ? "bg-[#FFEBDA] border-[#FFEBDA]" : "bg-white border-[#F2F2F2] "
      }`}
    >
      {category}
    </button>
  );
}
