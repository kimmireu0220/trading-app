import { render, screen } from "@testing-library/react";

import AlgorithmList from "./AlgorithmList";

describe("AlgorithmList component", () => {
  test("renders algorithms if request succeeds", async () => {
    render(<AlgorithmList />);

    const listItem = await screen.findAllByRole("listitem");
    expect(listItem).not.toHaveLength(0);
  });
});
