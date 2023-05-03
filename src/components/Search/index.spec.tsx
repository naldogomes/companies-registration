import { render, fireEvent, screen } from "@testing-library/react";
import Search from ".";

describe("Search", () => {
  it("should render with label and input", () => {
    render(<Search label="Search" />);
    const inputElement = screen.getByTestId("search-input") as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.type).toBe("search");
  });

  it("should allow user to type on input", () => {
    render(<Search label="Search" />);
    const inputElement = screen.getByTestId("search-input") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "testing" } });
    expect(inputElement.value).toBe("testing");
  });
});
