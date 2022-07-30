import React, { useLayoutEffect, useEffect, useRef } from "react";
import { Coordinate } from "../../hooks/useFunctionValues";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { Root } from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface Props {
  values: Coordinate[];
  switchToTableView: () => void;
}

export const ChartView: React.FC<Props> = ({ values, switchToTableView }) => {
  const chartRef = useRef<Root | null>(null);
  const seriesRef = useRef<am5xy.LineSeries | null>(null);
  const xAxisRef = useRef<am5xy.ValueAxis<am5xy.AxisRenderer> | null>(null);

  useLayoutEffect(() => {
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

    xAxisRef.current = xAxis;
    seriesRef.current = series;
    chartRef.current = root;

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current) {
      // seriesRef.current.data.setAll(values);
      // console.log("values", values);
      const lastX = values[values.length - 1]?.x;
      const lastY = values[values.length - 1]?.y;

      seriesRef.current.data.push({
        x: lastX,
        y: lastY,
      });

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
      <button onClick={switchToTableView}>Show Table</button>
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    </>
  );
};
