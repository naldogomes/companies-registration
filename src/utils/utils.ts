import { CompanyTableData } from "../pages/ListCompanies";

export const searchItem = (
  arr: CompanyTableData[],
  searchTerm: string
): CompanyTableData[] => {
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
