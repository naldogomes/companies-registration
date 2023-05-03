import styled from "styled-components";
import { AiOutlineMenu } from "react-icons/ai";

export const MenuHeaderContainer = styled.header<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    top: 0;
    left: 0;
    width: ${(props) => (props.isOpen ? "100%" : "auto")};
    height: ${(props) => (props.isOpen ? "100%" : "auto")};
    z-index: 1;
  }
`;

export const Menu = styled.nav<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    display: ${(props) => (props.isOpen ? "flex" : "none")};
  }
`;

export const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-left: 3rem;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    color: #c0c0c0;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1.5rem;
  }
`;

export const MenuButton = styled.button<{ isOpen: boolean }>`
  display: none;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: ${(props) => (props.isOpen ? "absolute" : "relative")};
  }
`;

export const Icon = styled(AiOutlineMenu)`
  vertical-align: middle;
`;
