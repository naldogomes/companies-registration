import {
  Button,
  ButtonsContainer,
  Container,
  Description,
  ModalContainer,
  Title,
} from "./styles";

type ConfirmationModalProps = {
  show: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal = ({
  show,
  title,
  description,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  if (!show) {
    return <></>;
  }

  return (
    <Container>
      <ModalContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonsContainer>
          <Button onClick={onClose}>Não</Button>
          <Button onClick={onConfirm} isWarned>
            Sim
          </Button>
        </ButtonsContainer>
      </ModalContainer>
    </Container>
  );
};

export default ConfirmationModal;
