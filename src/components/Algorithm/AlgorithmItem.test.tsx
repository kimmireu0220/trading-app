import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import AlgorithmItem from "./AlgorithmItem";

describe("AlgorithmItem component", () => {
  test('renders "View Detail" link', () => {
    const testConfig = {
      title: "Test",
      buyAlgorithm: "Price",
      buyTarget: (Math.random() * 100).toString(),
      sellAlgorithm: "Price",
      sellTarget: (Math.random() * 100 + 100).toString(),
      algorithmId: "test",
    };
    render(
      <BrowserRouter>
        <AlgorithmItem algorithmConfig={testConfig} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: "View Detail" });
    expect(link.getAttribute("href")).toBe(
      `/algorithms/${testConfig.algorithmId}`
    );
  });
});
