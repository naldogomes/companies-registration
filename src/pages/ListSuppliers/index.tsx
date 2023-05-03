import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { Supplier } from "../CreateSupplier";
import { Container, Title } from "./styles";
import Search from "../../components/Search";
import { searchItem } from "../../utils/utils";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { suppliersMock } from "./suppliers.mock";
import HeaderMenu from "../../components/HeaderMenu";
import { toast } from "react-toastify";

export type SupplierTableData = {
  type: string;
  CNPJ_CPF: string;
  fantasyName_Name: string;
  cep: string;
  uf: string;
  city: string;
  email: string;
};

const ListSuppliers = () => {
  const navigate = useNavigate();

  const [allData, setAllData] = useState<SupplierTableData[]>([]);
  const [data, setData] = useState<SupplierTableData[]>([]);
  const [search, setSearch] = useState("");
  const [currentSuppliers, setCurrentSuppliers] = useState<Supplier[]>(
    JSON.parse(localStorage.getItem("suppliers") || "[]")
  );
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);

  const headers = [
    "Tipo",
    "CNPJ / CPF",
    "Nome Fantasia / Nome",
    "CEP",
    "UF",
    "Cidade",
    "Email",
  ];

  useEffect(() => {
    if (search.length >= 2) setData(searchItem(allData, search));
    else setData(allData);
  }, [search]);

  useEffect(() => {
    let tableData: SupplierTableData[] = [];
    currentSuppliers.forEach((item: Supplier) => {
      tableData.push({
        type: item.isCNPJ ? "Pessoa Jurídica" : "Pessoa Física",
        CNPJ_CPF: item.cnpj || item.cpf || "",
        fantasyName_Name: item.fantasyName || item.name || "",
        cep: item.cep,
        uf: item.address?.uf || "",
        city: item.address?.localidade || "",
        email: item.email,
      });
    });
    setAllData(tableData);
    setData(tableData);
  }, [currentSuppliers]);

  const handleEdit = (index: any) => {
    navigate("/supplier-form", {
      state: { supplierToEdit: currentSuppliers[index], index },
    });
  };

  const handleDelete = (index: any) => {
    const suppliers = currentSuppliers.filter((item, i) => i !== index);

    setIndexToDelete(null);
    localStorage.setItem("suppliers", JSON.stringify(suppliers));
    toast.success("Fornecedor deletado com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
    });
    setCurrentSuppliers(suppliers);
  };

  // useEffect(() => {
  //   console.log(currentSuppliers);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "suppliers",
  //     JSON.stringify([...suppliersMock, ...suppliersMock, ...suppliersMock])
  //   );
  // }, []);

  return (
    <>
      <HeaderMenu currentPage="suppliers-list" />
      <ConfirmationModal
        show={indexToDelete !== null}
        title="Tem certeza que deseja excluir o fornecedor selecionado?"
        description="Esta ação não poderá ser desfeita"
        onClose={() => {
          setIndexToDelete(null);
        }}
        onConfirm={() => {
          handleDelete(indexToDelete);
        }}
      />
      <Container>
        <Title>Fornecedores</Title>
        <Search
          placeholder="Pesquise por Tipo, CNPJ, CPF, Nome fantasia, Nome, CEP, UF ou Cidade"
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

export default ListSuppliers;
