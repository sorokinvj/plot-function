import { render, screen } from "@testing-library/react";
import App from "./App";

test("it renders", () => {
  render(<App />);
  const appContainer = screen.getByTestId("app");
  expect(appContainer).toBeInTheDocument();
});
