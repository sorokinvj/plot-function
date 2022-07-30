import { Coordinate } from "hooks/useFunctionValues";
import React from "react";

interface Props {
  values: Coordinate[];
  switchToChartView: () => void;
}

export const TableView: React.FC<Props> = ({ values, switchToChartView }) => {
  // draw table with the values, table should have gray border, each
  // cell should have a border
  return (
    <>
      <button onClick={switchToChartView}>Show Chart</button>
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
    </>
  );
};
