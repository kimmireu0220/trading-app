import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import AlgorithmDetailOption from "./AlgorithmDetailOption";

let onGoToEdit: jest.Mock;
let onToggle: jest.Mock;

describe("AlgorithmDetailOption component", () => {
  beforeEach(() => {
    onGoToEdit = jest.fn();
    onToggle = jest.fn();
  });

  test("renders edit and delete buttons", () => {
    render(
      <BrowserRouter>
        <AlgorithmDetailOption onGoToEdit={onGoToEdit} onToggle={onToggle} />
      </BrowserRouter>
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls onGoToEdit when edit button is clicked", () => {
    render(
      <BrowserRouter>
        <AlgorithmDetailOption onGoToEdit={onGoToEdit} onToggle={onToggle} />
      </BrowserRouter>
    );

    screen.getByText("Edit").click();

    expect(onGoToEdit).toHaveBeenCalled();
  });

  test("calls onToggle when delete button is clicked", () => {
    render(
      <BrowserRouter>
        <AlgorithmDetailOption onGoToEdit={onGoToEdit} onToggle={onToggle} />
      </BrowserRouter>
    );

    screen.getByText("Delete").click();

    expect(onToggle).toHaveBeenCalled();
  });
});
