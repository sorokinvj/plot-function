import React from "react";
import { ChartView } from "components/ChartView/ChartView";
import { useFunctionValues } from "hooks/useFunctionValues";
import { TableView } from "components/TableView/TableView";

export const App: React.FC = () => {
  const { values } = useFunctionValues();
  const [isChartView, setChartView] = React.useState(true);

  const switchToTableView = () => {
    setChartView(false);
  };

  const switchToChartView = () => {
    setChartView(true);
  };

  return (
    <div
      style={{
        padding: "1rem",
      }}
      data-testid="app"
    >
      <div
        style={{
          display: isChartView ? "flex" : "none",
          flexFlow: "column",
          alignItems: "center",
        }}
        data-testid="chart-view"
      >
        <ChartView values={values} switchToTableView={switchToTableView} />
      </div>
      <div
        style={{
          display: isChartView ? "none" : "flex",
          flexFlow: "column",
          alignItems: "center",
        }}
        data-testid="table-view"
      >
        <TableView values={values} switchToChartView={switchToChartView} />
      </div>
    </div>
  );
};
