import React from "react";
import { Coordinate } from "./useFunctionValues";
import { useScreenSize } from "./useScreenSize";

export const Canvas: React.FC<{ values: Coordinate[] }> = ({ values }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // set coordinate center in a variable
        const center = { x: canvas.width / 2, y: canvas.height / 2 };
        // draw coordinate system with the center in the middle of the canvas
        ctx.beginPath();
        ctx.moveTo(center.x, 0);
        ctx.lineTo(center.x, canvas.height);
        ctx.moveTo(0, center.y);
        ctx.lineTo(canvas.width, center.y);
        ctx.stroke();
        // draw the function values as red dots with 3px width with the respect to coordinate system
        // values should be mapped to coordinate system defined above with x axis range from - 3 to 3 and y axis range from -2 to 2
        // store x and y axis ranges in a variable
        const xRange = { min: -3, max: 3 };
        const yRange = { min: -2, max: 2 };
        // draw the function values as red dots with 3px width with the respect to coordinate system
        values.forEach((value) => {
          const x =
            value.x * (canvas.width / (xRange.max - xRange.min)) + center.x;
          const y =
            value.y * (canvas.height / (yRange.max - yRange.min)) + center.y;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
        });
      }
    }
  }, [values]);

  const { width, height } = useScreenSize();

  return <canvas ref={canvasRef} width={width - 100} height={height - 100} />;
};
