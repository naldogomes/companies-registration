import { Container, Description, Icon, Title } from "./styles";

const NotFoundPage = () => {
  return (
    <Container>
      <Icon data-testid="not-found-icon" />
      <Title>Página não encontrada</Title>
      <Description>A página que você está procurando não existe.</Description>
    </Container>
  );
};

export default NotFoundPage;
