import { render, fireEvent, screen } from "@testing-library/react";
import { MdAdd } from "react-icons/md";
import PageOptionCard from ".";

describe("PageOptionCard component", () => {
  it("should render the title and the icon passed as props", () => {
    render(<PageOptionCard title="Add" Icon={MdAdd} onClick={() => {}} />);

    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
    expect(screen.getByTestId("card-text")).toBeInTheDocument();
  });

  it("should call onClick when the card is clicked", () => {
    const onClickMock = jest.fn();
    render(<PageOptionCard title="Add" Icon={MdAdd} onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId("card"));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
