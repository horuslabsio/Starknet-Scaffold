export const searchResources = async ({
  resources,
  search,
}: {
  search: string;
  resources: any;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const lowerCaseSearch = search.toLocaleLowerCase();

  return resources.filter((resource: any) =>
    Object.values(resource).some(
      (value) =>
        typeof value === "string" &&
        value.toLocaleLowerCase().includes(lowerCaseSearch),
    ),
  );
};


export const formatCurrency = (currency: number) => {
  let amount = currency / 1e18;
  return amount || 0;
}



export const formatDate = (isoString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", options);
}
