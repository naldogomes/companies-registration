import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { Company } from "../CreateCompany";
import { Container, Title } from "./styles";
import Search from "../../components/Search";
import { searchItem } from "../../utils/utils";
import { companyMocks } from "./companies.mock";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../components/HeaderMenu";

export type CompanyTableData = {
  CNPJ: string;
  fantasyName: string;
  cep: string;
  uf: string;
  city: string;
};

const ListCompanies = () => {
  const navigate = useNavigate();

  const [allData, setAllData] = useState<CompanyTableData[]>([]);
  const [data, setData] = useState<CompanyTableData[]>([]);
  const [search, setSearch] = useState("");
  const [currentCompanies, setCurrentCompanies] = useState<Company[]>(
    JSON.parse(localStorage.getItem("companies") || "[]")
  );
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);

  const headers = ["CNPJ", "Nome Fantasia", "CEP", "UF", "Cidade"];

  useEffect(() => {
    if (search.length >= 2) setData(searchItem(allData, search));
    else setData(allData);
  }, [search]);

  useEffect(() => {
    let tableData: CompanyTableData[] = [];
    currentCompanies.forEach((item: Company) => {
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
  }, [currentCompanies]);

  const handleEdit = (index: any) => {
    navigate("/company-form", {
      state: { companyToEdit: currentCompanies[index], index },
    });
  };

  const handleDelete = (index: any) => {
    const companies = currentCompanies.filter((item, i) => i !== index);

    setIndexToDelete(null);
    localStorage.setItem("companies", JSON.stringify(companies));
    setCurrentCompanies(companies);
  };

  // useEffect(() => {
  //   localStorage.setItem(
  //     "companies",
  //     JSON.stringify([...companyMocks, ...companyMocks, ...companyMocks])
  //   );
  // }, []);

  return (
    <>
      <HeaderMenu currentPage="companies-list" />
      <ConfirmationModal
        show={indexToDelete !== null}
        title="Tem certeza que deseja excluir a empresa selecionada?"
        description="Esta ação não poderá ser desfeita"
        onClose={() => {
          setIndexToDelete(null);
        }}
        onConfirm={() => {
          handleDelete(indexToDelete);
        }}
      />
      <Container>
        <Title>Empresas</Title>
        <Search
          placeholder="Pesquise por CNPJ, Nome fantasia, CEP, UF ou Cidade"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <DataTable
          headers={headers}
          data={data}
          key={JSON.stringify(data)}
          handleEdit={handleEdit}
          handleDelete={(index) => {
            setIndexToDelete(index);
          }}
        />
      </Container>
    </>
  );
};

export default ListCompanies;
