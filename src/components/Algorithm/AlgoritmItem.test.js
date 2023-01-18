import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import AlgorithmItem from "./AlgorithmItem";

describe("AlgorithmItem component", () => {
  test('renders link "View Detail"', () => {
    const testConfig = {
      id: "test",
      title: "Test",
      buyAlgorithm: "Price",
      buyTarget: 139,
      sellAlgorithm: "Price",
      sellTarget: 141,
      description: "test",
    };
    render(
      <BrowserRouter>
        <AlgorithmItem algorithmConfig={testConfig} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: "View Detail" });
    expect(link.href).toBe(`http://localhost/algorithms/${testConfig.id}`);
  });
});
