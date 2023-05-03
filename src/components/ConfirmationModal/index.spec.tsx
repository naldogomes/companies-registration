import {
  render,
  screen,
  fireEvent,
  RenderResult,
  act,
} from "@testing-library/react";
import ConfirmationModal, { ConfirmationModalProps } from ".";

describe("ConfirmationModal", () => {
  const props: ConfirmationModalProps = {
    show: true,
    title: "Title",
    description: "Description",
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  let wrapper: RenderResult;

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    wrapper = render(<ConfirmationModal {...props} />);
  });

  const itif = (show: boolean) => (show ? it : it.skip);

  it("should render without throwing an error", () => {
    expect(wrapper.container).toBeInTheDocument();
  });

  it("should not render when show prop is false", () => {
    wrapper.rerender(<ConfirmationModal {...props} show={false} />);
    expect(wrapper.container).toBeEmptyDOMElement();
  });

  itif(props.show)("should call onClose when No button is clicked", () => {
    const noButton = screen.getByText("Não");
    fireEvent.click(noButton);
    expect(props.onClose).toHaveBeenCalled();
  });

  itif(props.show)(
    "should call onConfirm after 2 seconds when Yes button is clicked",
    async () => {
      jest.useFakeTimers();
      const yesButton = screen.getByText("Sim");
      fireEvent.click(yesButton);
      expect(props.onConfirm).not.toHaveBeenCalled();
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(props.onConfirm).toHaveBeenCalled();
      jest.useRealTimers();
    }
  );
});
