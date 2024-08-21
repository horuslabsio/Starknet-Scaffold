const Loading = ({
  dimension = "h-[3rem] w-[3rem]",
}: {
  dimension?: string;
}) => {
  return (
    <span
      className={`inline-block ${dimension} animate-spin rounded-full border-[2px] border-[--headings] border-b-transparent`}
    ></span>
  );
};

export default Loading;
