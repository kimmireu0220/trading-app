import { render, fireEvent, screen } from "@testing-library/react";

import ErrorModal from "./ErrorModal";

describe("ErrorModal component", () => {
  let backdropRoot: HTMLDivElement;
  let overlayRoot: HTMLDivElement;

  let onConfirmMock: jest.Mock;

  beforeEach(() => {
    onConfirmMock = jest.fn();
  });

  test("renders the title and message", () => {
    backdropRoot = document.createElement("div");
    backdropRoot.id = "backdrop-root";
    document.body.appendChild(backdropRoot);

    overlayRoot = document.createElement("div");
    overlayRoot.id = "overlay-root";
    document.body.appendChild(overlayRoot);

    render(
      <ErrorModal
        title="Error"
        message="An error occurred"
        onConfirm={onConfirmMock}
      />
    );

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  test("calls the onConfirm function when the Okay button is clicked", () => {
    render(
      <ErrorModal
        title="Error"
        message="An error occurred"
        onConfirm={onConfirmMock}
      />
    );

    fireEvent.click(screen.getByText("Okay"));

    expect(onConfirmMock).toHaveBeenCalled();
  });

  test("calls the onConfirm function when the backdrop is clicked", () => {
    render(
      <ErrorModal
        title="Error"
        message="An error occurred"
        onConfirm={onConfirmMock}
      />
    );

    const backdrop = screen.getByTestId("test-backdrop");
    fireEvent.click(backdrop);

    expect(onConfirmMock).toHaveBeenCalled();
  });
});
