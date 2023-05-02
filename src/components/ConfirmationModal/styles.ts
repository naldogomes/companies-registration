import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
  position: fixed;
  padding: 24px;
  width: 500px;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 8px;
`;

export const Title = styled.p`
  margin-bottom: 12px;
  font-weight: bold;
`;

export const Description = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  color: #48494b;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button<{ isWarned?: boolean }>`
  border: 1px solid;
  border-color: ${(props) => (props.isWarned ? "#f08080" : "#ccc")};
  border-radius: 4px;
  color: ${(props) => (props.isWarned ? "#f08080" : "#000")};
  padding: 8px 16px;
  width: 80px;
  margin-right: 8px;

  &:hover {
    color: ${(props) => (props.isWarned ? "#dc143c" : "#0062cc")};
    border-color: ${(props) => (props.isWarned ? "#dc143c" : "#0062cc")};
    cursor: pointer;
  }
`;
