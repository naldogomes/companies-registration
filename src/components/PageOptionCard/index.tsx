import { IconType } from "react-icons";
import { Container, Title } from "./styles";

export type PageOptionCardProps = {
  title: string;
  Icon: IconType;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const PageOptionCard = ({ title, Icon, onClick }: PageOptionCardProps) => {
  return (
    <Container onClick={onClick} data-testid="card">
      <Icon data-testid="card-icon" />
      <Title data-testid="card-text">{title}</Title>
    </Container>
  );
};

export default PageOptionCard;
