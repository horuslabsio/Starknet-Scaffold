export default function Select({ options, onChange, value, ...props }: any) {
  return (
    <select
      value={value}
      {...props}
      onChange={onChange}
      className="flex cursor-pointer items-center rounded-xl border-[1px] border-[#F2F2F2] bg-transparent px-3 py-2 text-[--headings]"
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
