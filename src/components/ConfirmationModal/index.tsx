import { useState } from "react";
import Spinner from "../Spinner";
import {
  Button,
  ButtonsContainer,
  Container,
  Description,
  ModalContainer,
  Title,
} from "./styles";

export type ConfirmationModalProps = {
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
  const [isLoading, setIsLoading] = useState(false);

  if (!show) {
    return <></>;
  }

  return (
    <Container>
      <ModalContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonsContainer>
          <Button onClick={onClose} disabled={isLoading}>
            Não
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                onConfirm();
              }, 2000);
            }}
            isWarned
          >
            {isLoading ? <Spinner size="12px" color="#f08080" /> : "Sim"}
          </Button>
        </ButtonsContainer>
      </ModalContainer>
    </Container>
  );
};

export default ConfirmationModal;
