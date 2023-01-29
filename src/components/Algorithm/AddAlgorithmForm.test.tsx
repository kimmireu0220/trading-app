import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AlgorithmForm from "./AlgorithmForm";

describe("AlgorithmForm", () => {
  let props: {
    action: string;
    onAddAlgorithm: () => void;
  };

  beforeEach(() => {
    props = {
      action: "add",
      onAddAlgorithm: jest.fn(),
    };
  });

  it("should not submit the form if any of the fields are blank", async () => {
    render(<AlgorithmForm {...props} />);

    const titleInput = screen.getByText("Title") as HTMLInputElement;
    const buyAlgorithmInput = screen.getByText("Buy") as HTMLSelectElement;
    const sellAlgorithmInput = screen.getByText("Sell") as HTMLSelectElement;
    const descriptionInput = screen.getByText(
      "Description"
    ) as HTMLTextAreaElement;
    const submitButton = screen.getByText("Add");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(buyAlgorithmInput, { target: { value: "Price" } });
    fireEvent.change(sellAlgorithmInput, { target: { value: "Price" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(props.onAddAlgorithm).not.toHaveBeenCalled();
    });
  });
});
