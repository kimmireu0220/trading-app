import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import AlgorithmForm from "./AlgorithmForm";

import Algorithm from "../../models/algorithm";

const DUMMY_ALGORITHM = {
  title: "",
  buyAlgorithm: "",
  buyTarget: "",
  sellAlgorithm: "",
  sellTarget: "",
  description: "",
};

describe("AddAlgorithmForm component", () => {
  let backdropRoot: HTMLDivElement;
  let overlayRoot: HTMLDivElement;

  let props: {
    action: string;
    onAddAlgorithm: (algorithmData: Algorithm) => void;
    algorithmConfig: Algorithm;
  };

  beforeEach(() => {
    backdropRoot = document.createElement("div");
    backdropRoot.id = "backdrop-root";
    document.body.appendChild(backdropRoot);

    overlayRoot = document.createElement("div");
    overlayRoot.id = "overlay-root";
    document.body.appendChild(overlayRoot);

    props = {
      action: "add",
      onAddAlgorithm: jest.fn(),
      algorithmConfig: DUMMY_ALGORITHM,
    };
  });

  test("should submit form when all fields are filled out", async () => {
    render(
      <BrowserRouter>
        <AlgorithmForm {...props} />
      </BrowserRouter>
    );

    const titleInput = screen.getByLabelText("Title");
    const buyAlgorithmInput = screen.getByLabelText("Buy Algorithm");
    const buyTargetInput = screen.getByLabelText("Buy Target");
    const sellAlgorithmInput = screen.getByLabelText("Sell Algorithm");
    const sellTargetInput = screen.getByLabelText("Sell Target");
    const descriptionInput = screen.getByLabelText("Description");

    fireEvent.input(titleInput, { target: { value: "Test Algorithm" } });
    fireEvent.input(buyAlgorithmInput, { target: { value: "Price" } });
    fireEvent.input(buyTargetInput, { target: { value: 10 } });
    fireEvent.input(sellAlgorithmInput, { target: { value: "Price" } });
    fireEvent.input(sellTargetInput, { target: { value: 20 } });
    fireEvent.input(descriptionInput, {
      target: { value: "Test Description" },
    });

    const addButton = screen.getByText("Add");

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(props.onAddAlgorithm).toHaveBeenCalledWith({
        title: "Test Algorithm",
        buyAlgorithm: "Price",
        buyTarget: "10",
        sellAlgorithm: "Price",
        sellTarget: "20",
        description: "Test Description",
      });
    });
  });

  test("should not submit the form if any of the fields are blank", async () => {
    render(
      <BrowserRouter>
        <AlgorithmForm {...props} />
      </BrowserRouter>
    );

    const addButton = screen.getByText("Add");

    fireEvent.click(addButton);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(props.onAddAlgorithm).not.toHaveBeenCalled();
    });
  });
});
