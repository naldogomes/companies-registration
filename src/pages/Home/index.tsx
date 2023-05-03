import { FC } from "react";
import {
  CardsRow,
  CompanyIcon,
  Container,
  ListIcon,
  SupplierIcon,
  Title,
} from "./styles";
import PageOptionCard from "../../components/PageOptionCard";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <Container>
      <Title>Cadastro de Empresas e Fornecedores</Title>
      <CardsRow>
        <PageOptionCard
          title={"Cadastrar\nFornecedor"}
          Icon={SupplierIcon}
          onClick={() => navigateTo("/supplier-form")}
        />
        <PageOptionCard
          title={"Cadastrar\nEmpresa"}
          Icon={CompanyIcon}
          onClick={() => navigateTo("/company-form")}
        />
      </CardsRow>
      <CardsRow>
        <PageOptionCard
          title={"Fornecedores\nCadastrados"}
          Icon={ListIcon}
          onClick={() => navigateTo("/suppliers-list")}
        />

        <PageOptionCard
          title={"Empresas\nCadastradas"}
          Icon={ListIcon}
          onClick={() => navigateTo("/companies-list")}
        />
      </CardsRow>
    </Container>
  );
};

export default Home;
