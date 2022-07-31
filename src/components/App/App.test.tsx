import { act, render, screen, waitFor } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    const appContainer = screen.getByTestId("app");
    expect(appContainer).toBeInTheDocument();
  });

  it("renders a chart view by default", () => {
    render(<App />);
    const chartView = screen.getByTestId("chart-view");
    const tableView = screen.queryByTestId("table-view");
    expect(chartView).toBeVisible();
    expect(tableView).not.toBeVisible();
  });

  it("renders a taable view when clicked on 'Show table' button", async () => {
    render(<App />);
    const button = screen.getByText("Show Table");

    act(() => {
      button.click();
    });

    await waitFor(() => {
      const tableView = screen.getByTestId("table-view");
      expect(tableView).toBeVisible();
    });
    const chartView = screen.queryByTestId("chart-view");
    expect(chartView).not.toBeVisible();
  });
});
