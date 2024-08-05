export default function Select({ options, onChange, value, ...props }: any) {
  return (
    <select
      value={value}
      {...props}
      onChange={onChange}
      className="flex py-2 px-3 items-center border-[2px] text-[#141925] border-[#F2F2F2] rounded-xl"
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
