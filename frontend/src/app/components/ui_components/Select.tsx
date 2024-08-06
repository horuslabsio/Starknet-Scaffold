export default function Select({ options, onChange, value, ...props }: any) {
  return (
    <select
      value={value}
      {...props}
      onChange={onChange}
      className="flex items-center rounded-xl border-[2px] border-[#F2F2F2] px-3 py-2 text-[#141925]"
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
