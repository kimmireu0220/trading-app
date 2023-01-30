import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import AlgorithmList from "./AlgorithmList";

describe("AlgorithmList component", () => {
  test("renders algorithms if request succeeds", async () => {
    const DUMMY_ALGORITHMS = {
      test_id_1: {
        title: "Test",
        buyAlgorithm: "Price",
        buyTarget: (Math.random() * 100).toFixed(2),
        sellAlgorithm: "Price",
        sellTarget: (Math.random() * 100 + 100).toFixed(2),
        description: "test",
      },
      test_id_2: {
        title: "Test 2",
        buyAlgorithm: "Price",
        buyTarget: (Math.random() * 100).toFixed(2),
        sellAlgorithm: "Price",
        sellTarget: (Math.random() * 100 + 100).toFixed(2),
        description: "test 2",
      },
    };

    window.fetch = jest
      .fn()
      .mockResolvedValue({ json: () => DUMMY_ALGORITHMS });

    render(
      <BrowserRouter>
        <AlgorithmList />
      </BrowserRouter>
    );

    const listItem = await screen.findAllByRole("listitem");
    expect(listItem).not.toHaveLength(0);
  });

  test('renders "Cannot read properties of undefined (reading "json")" if there is no json data', async () => {
    window.fetch = jest.fn();

    render(
      <BrowserRouter>
        <AlgorithmList />
      </BrowserRouter>
    );

    const message = await screen.findByText(
      "Cannot read properties of undefined (reading 'json')"
    );
    expect(message).toBeInTheDocument();
  });

  test('renders "Could not fetch algorithms" if there is no response data', async () => {
    const EMPTY_DUMMY_ALGORITHM = {};

    window.fetch = jest
      .fn()
      .mockResolvedValue({ json: () => EMPTY_DUMMY_ALGORITHM });

    render(
      <BrowserRouter>
        <AlgorithmList />
      </BrowserRouter>
    );

    const message = await screen.findByText("Could not fetch algorithms");
    expect(message).toBeInTheDocument();
  });
});
