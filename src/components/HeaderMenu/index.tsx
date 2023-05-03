import { useState } from "react";
import {
  MenuHeaderContainer,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
} from "./styles";

interface HeaderMenuProps {
  currentPage:
    | "supplier-form"
    | "suppliers-list"
    | "company-form"
    | "companies-list";
}

const HeaderMenu = ({ currentPage }: HeaderMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuHeaderContainer isOpen={isOpen}>
      <Menu isOpen={isOpen}>
        <MenuItem href="/">Home</MenuItem>
        {currentPage !== "supplier-form" && (
          <MenuItem href="/supplier-form">Cadastrar fornecedor</MenuItem>
        )}
        {currentPage !== "suppliers-list" && (
          <MenuItem href="/suppliers-list">Fornecedores</MenuItem>
        )}
        {currentPage !== "company-form" && (
          <MenuItem href="/company-form">Cadastrar empresa</MenuItem>
        )}
        {currentPage !== "companies-list" && (
          <MenuItem href="/companies-list">Empresas</MenuItem>
        )}
      </Menu>
      <MenuButton onClick={handleMenuButtonClick} isOpen={isOpen}>
        <Icon />
      </MenuButton>
    </MenuHeaderContainer>
  );
};

export default HeaderMenu;
