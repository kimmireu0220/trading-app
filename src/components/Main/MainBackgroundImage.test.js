import { render, screen } from "@testing-library/react";

import MainBackgroundImage from "./MainBackgroundImage";
import backgroundImg from "../../assets/main-page-background.jpeg";

describe("MainBackgroundImage component", () => {
  test("renders image which has correct src value", () => {
    render(<MainBackgroundImage />);

    const testImage = screen.getByRole("img");
    expect(testImage.src).toContain(backgroundImg);
  });

  test('renders image which has correct alt value, "background"', () => {
    render(<MainBackgroundImage />);

    const testImage = screen.getByRole("img");
    expect(testImage.alt).toContain("background");
  });
});
