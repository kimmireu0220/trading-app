import { render, screen } from "@testing-library/react";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal component", () => {
  let backdropRoot: HTMLDivElement;
  let overlayRoot: HTMLDivElement;

  beforeEach(() => {
    backdropRoot = document.createElement("div");
    backdropRoot.id = "backdrop-root";
    document.body.appendChild(backdropRoot);

    overlayRoot = document.createElement("div");
    overlayRoot.id = "overlay-root";
    document.body.appendChild(overlayRoot);
  });

  test("should render the title and message", () => {
    render(
      <ConfirmModal
        show={true}
        title="Confirm"
        message="Are you sure you want to do this?"
        onClose={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to do this?")
    ).toBeInTheDocument();
  });

  test("should call onClose when the 'No' button is clicked", () => {
    const onClose = jest.fn();

    render(
      <ConfirmModal
        show={true}
        title="Confirm"
        message="Are you sure you want to do this?"
        onClose={onClose}
        onConfirm={() => {}}
      />
    );

    const noButton = screen.getByText("No");
    noButton.click();

    expect(onClose).toHaveBeenCalled();
  });

  test("should call onConfirm when the 'Okay' button is clicked", () => {
    const onConfirm = jest.fn();

    render(
      <ConfirmModal
        show={true}
        title="Confirm"
        message="Are you sure you want to do this?"
        onClose={() => {}}
        onConfirm={onConfirm}
      />
    );

    const okayButton = screen.getByText("Okay");
    okayButton.click();

    expect(onConfirm).toHaveBeenCalled();
  });
});
