import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Main from "./Main";

describe("Main page", () => {
  test('renders title, "Trade stocks with your own Algorithms"', () => {
    render(<Main />);

    const title = screen.getByText("Trade stocks with your own Algorithms", {
      exact: false,
    });
    expect(title).toBeInTheDocument();
  });
});
