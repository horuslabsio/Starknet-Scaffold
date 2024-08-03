export default function CategoryButton({
  category,
  onClick,
  disabled,
  active,
}: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-fit py-2 px-6 rounded-xl border-[2px] ${
        active ? "bg-[#FFEBDA] border-[#FFEBDA]" : "bg-white border-[#F2F2F2] "
      }`}
    >
      {category}
    </button>
  );
}
