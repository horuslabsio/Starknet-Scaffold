export default function Select({ options, onChange, value, ...props }: any) {
  return (
    <select
      value={value}
      {...props}
      onChange={onChange}
      className="flex w-fit cursor-pointer items-center rounded-[10px] border-[1px] border-[#F2F2F2] bg-transparent px-3 py-2 text-[--headings] md:rounded-xl md:px-2 md:py-3"
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
