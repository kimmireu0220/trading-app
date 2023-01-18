import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import AlgorithmList from "./AlgorithmList";

describe("AlgorithmList component", () => {
  test("renders algorithms if request succeeds", async () => {
    render(
      <BrowserRouter>
        <AlgorithmList />
      </BrowserRouter>
    );

    const listItem = await screen.findAllByRole("listitem");
    expect(listItem).not.toHaveLength(0);
  });
});
