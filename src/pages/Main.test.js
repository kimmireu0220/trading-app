import { render, screen } from "@testing-library/react";

import Main from "./Main";

describe("Main page", () => {
  test('renders title, include "Trade stocks"', () => {
    render(<Main />);

    const title = screen.getByText("Trade stocks");
    expect(title).toBeInTheDocument();
  });
});
