import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { Company } from "../CreateCompany";
import { Container } from "./styles";

export type CompanyTableData = {
  CNPJ: string;
  fantasyName: string;
  cep: string;
  uf: string;
  city: string;
};

const ListCompanies = () => {
  const [data, setData] = useState<CompanyTableData[]>([]);

  const headers = ["CNPJ", "Nome Fantasia", "CEP", "Cidade", "UF"];

  useEffect(() => {
    const companies = JSON.parse(localStorage.getItem("companies") || "[]");
    let tableData: CompanyTableData[] = [];
    companies.forEach((item: Company) => {
      tableData.push({
        CNPJ: item.cnpj,
        fantasyName: item.fantasyName,
        cep: item.cep,
        uf: item.address?.uf || "",
        city: item.address?.localidade || "",
      });
    });
    setData(tableData);
  }, []);

  return (
    <Container>
      <DataTable headers={headers} data={data} />
    </Container>
  );
};

export default ListCompanies;
