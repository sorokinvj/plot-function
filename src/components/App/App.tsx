import React from "react";
import { ChartView } from "components/ChartView/ChartView";
import { useFunctionValues } from "hooks/useFunctionValues";
import { TableView } from "components/TableView/TableView";

function App() {
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
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        padding: "1rem",
        height: "97%",
      }}
    >
      {isChartView ? (
        <ChartView values={values} switchToTableView={switchToTableView} />
      ) : (
        <TableView values={values} switchToChartView={switchToChartView} />
      )}
    </div>
  );
}

export default App;
