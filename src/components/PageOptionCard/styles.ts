import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  background-color: #fff;
  padding: 24px;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  border: 1px solid transparent;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    border-color: #c0c0c0;
  }
`;

export const Title = styled.div`
  margin-top: 16px;
  text-align: center;
  font-weight: 600;
  white-space: pre-wrap;
`;
