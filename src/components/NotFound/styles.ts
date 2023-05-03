import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f5f5dc;
`;

export const Icon = styled(FaExclamationTriangle)`
  font-size: 4rem;
  margin-bottom: 1rem;
  margin-top: 3em;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 1.2rem;
`;
