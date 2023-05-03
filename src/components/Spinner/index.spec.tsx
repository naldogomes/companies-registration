import { render, screen } from "@testing-library/react";
import Spinner from ".";

describe("Spinner", () => {
  it("should render a spinner", () => {
    render(<Spinner />);
    const svgElement = screen.getByTestId("spinner");
    expect(svgElement).toBeInTheDocument();
    const circleElement = screen.getByTestId("circle");
    expect(circleElement).toBeInTheDocument();
  });

  it("should render a spinner with a specific size", () => {
    const size = "50px";
    const color = "red";
    render(<Spinner size={size} color={color} />);
    const svgElement = screen.getByTestId("spinner");
    expect(svgElement).toHaveStyle(`width: ${size}`);
    expect(svgElement).toHaveStyle(`height: ${size}`);
  });
});
