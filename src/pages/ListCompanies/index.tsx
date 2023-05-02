import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { Company } from "../CreateCompany";
import { Container, Title } from "./styles";
import Search from "../../components/Search";
import { searchItem } from "../../utils/utils";

export type CompanyTableData = {
  CNPJ: string;
  fantasyName: string;
  cep: string;
  uf: string;
  city: string;
};

const ListCompanies = () => {
  const [allData, setAllData] = useState<CompanyTableData[]>([]);
  const [data, setData] = useState<CompanyTableData[]>([]);
  const headers = ["CNPJ", "Nome Fantasia", "CEP", "UF", "Cidade"];

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length >= 2) setData(searchItem(allData, search));
    else setData(allData);
  }, [search]);

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
    setAllData(tableData);
    setData(tableData);
  }, []);

  return (
    <Container>
      <Title>Empresas</Title>
      <Search
        placeholder="Pesquise por CNPJ, Nome fantasia, CEP, UF ou Cidade"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <DataTable headers={headers} data={data} />
    </Container>
  );
};

export default ListCompanies;
