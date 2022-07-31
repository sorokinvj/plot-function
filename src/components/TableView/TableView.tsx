import { Button } from "components/Button/Button";
import { Coordinate } from "hooks/useFunctionValues";
import React from "react";
import "./table.css";

interface Props {
  values: Coordinate[];
  switchToChartView: () => void;
}

export const TableView: React.FC<Props> = ({ values, switchToChartView }) => (
  <div
    style={{
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
    }}
    data-testid="table-view"
  >
    <h1 style={{ marginBottom: 0 }}>Values for the function</h1>
    <h2 style={{ marginTop: 0, color: "#ff0000" }}>y = sin(x)</h2>
    <Button onClick={switchToChartView}>Show Chart</Button>
    <table>
      <thead>
        <tr>
          <th>X</th>
          <th>Y</th>
        </tr>
      </thead>
      <tbody>
        {values.map((value) => (
          <tr key={value.x}>
            <td>{value.x}</td>
            <td>{value.y}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
