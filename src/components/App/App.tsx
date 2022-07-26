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
      {isChartView ? (
        <ChartView values={values} switchToTableView={switchToTableView} />
      ) : (
        <TableView values={values} switchToChartView={switchToChartView} />
      )}
    </div>
  );
};
