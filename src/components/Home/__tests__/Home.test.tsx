import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "..";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

describe("Home", () => {
  it("Check render", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const appName = screen.getByTestId("home-app-name-test-id");
    expect(appName).toBeInTheDocument();
    expect(appName).toHaveTextContent("CalorieTracker");
  });
});
