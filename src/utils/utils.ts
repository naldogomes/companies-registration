export const searchItem = (arr: any[], searchTerm: string): any[] => {
  const filteredArr = arr.filter((item) =>
    Object.values(item).some((val) =>
      String(val)
        .toLowerCase()
        .replace(/\W/g, "")
        .includes(searchTerm.toLowerCase().replace(/\W/g, ""))
    )
  );

  return filteredArr;
};
