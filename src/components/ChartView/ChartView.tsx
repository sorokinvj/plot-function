import React, { useLayoutEffect, useEffect, useRef } from "react";
import { Coordinate } from "../../hooks/useFunctionValues";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Button } from "components/Button/Button";

interface Props {
  values: Coordinate[];
  switchToTableView: () => void;
}

export const ChartView: React.FC<Props> = ({ values, switchToTableView }) => {
  const seriesRef = useRef<am5xy.LineSeries | null>(null);

  useLayoutEffect(() => {
    // init empty chart
    const root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    const xAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: -1,
        max: 5,
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: -1,
        max: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Sin(x)",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "x",
        valueYField: "y",
      })
    );

    seriesRef.current?.data.setAll(values);
    seriesRef.current = series;

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current) {
      const lastX = values[values.length - 1]?.x;
      const lastY = values[values.length - 1]?.y;

      // update the chart with new values
      seriesRef.current.data.push({
        x: lastX,
        y: lastY,
      });

      // draw a red circle at the last point
      seriesRef.current.bullets.push(function (root, series) {
        series.bulletsContainer.children.clear();
        const container: am5.Container = am5.Container.new(root, {});
        const circle = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000),
          })
        );

        circle.animate({
          key: "radius",
          to: 20,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
        });
        circle.animate({
          key: "opacity",
          to: 0,
          from: 1,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
        });

        return am5.Bullet.new(root, {
          locationX: lastX,
          locationY: lastY,
          sprite: container,
        });
      });
    }
  }, [values]);

  return (
    <>
      <h1 style={{ marginBottom: 0 }}>Plotting the function</h1>
      <h2 style={{ marginTop: 0, color: "#ff0000" }}>y = sin(x)</h2>
      <Button onClick={switchToTableView}>Show Table</Button>
      <div
        id="chartdiv"
        style={{ width: "100%", height: "500px", marginTop: "1rem" }}
      ></div>
    </>
  );
};
