import { render, screen } from "@testing-library/react";
import NotFoundPage from ".";

describe("NotFoundPage component", () => {
  test("should render the title", () => {
    render(<NotFoundPage />);
    const title = screen.getByText(/página não encontrada/i);
    expect(title).toBeInTheDocument();
  });

  test("should render the description", () => {
    render(<NotFoundPage />);
    const description = screen.getByText(
      /a página que você está procurando não existe/i
    );
    expect(description).toBeInTheDocument();
  });

  test("should render the icon", () => {
    render(<NotFoundPage />);
    const icon = screen.getByTestId("not-found-icon");
    expect(icon).toBeInTheDocument();
  });
});
