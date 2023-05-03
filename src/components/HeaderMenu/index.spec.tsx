import { render, screen } from "@testing-library/react";
import HeaderMenu from ".";

describe("HeaderMenu component", () => {
  test("should render menu button", () => {
    render(<HeaderMenu currentPage="supplier-form" />);

    const menuButton = screen.getByTestId("menu-button");

    expect(menuButton).toBeInTheDocument();
  });

  test("should show home, suppliers, and companies links", () => {
    render(<HeaderMenu currentPage="supplier-form" />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const suppliersLink = screen.getByRole("link", { name: "Fornecedores" });
    const companiesLink = screen.getByRole("link", { name: "Empresas" });

    expect(homeLink).toBeInTheDocument();
    expect(suppliersLink).toBeInTheDocument();
    expect(companiesLink).toBeInTheDocument();
  });

  test("should not show link to suppliers list if on suppliers list page", () => {
    render(<HeaderMenu currentPage="suppliers-list" />);

    const suppliersLink = screen.queryByRole("link", { name: "Fornecedores" });

    expect(suppliersLink).not.toBeInTheDocument();
  });

  test("should not show link to supplier form if on supplier form page", () => {
    render(<HeaderMenu currentPage="supplier-form" />);

    const supplierFormLink = screen.queryByRole("link", {
      name: "Cadastrar fornecedor",
    });

    expect(supplierFormLink).not.toBeInTheDocument();
  });

  test("should not show link to companies list if on companies list page", () => {
    render(<HeaderMenu currentPage="companies-list" />);

    const companiesLink = screen.queryByRole("link", { name: "Empresas" });

    expect(companiesLink).not.toBeInTheDocument();
  });

  test("should not show link to company form if on company form page", () => {
    render(<HeaderMenu currentPage="company-form" />);

    const companyFormLink = screen.queryByRole("link", {
      name: "Cadastrar empresa",
    });

    expect(companyFormLink).not.toBeInTheDocument();
  });
});
