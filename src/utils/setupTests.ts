// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "jest-canvas-mock";
import "core-js"; // fix setImmediate being undefined

jest.mock("@amcharts/amcharts5", () => ({
  Root: {
    new: function () {
      return {
        setThemes: jest.fn(),
        dispose: jest.fn(),
        container: {
          children: {
            push: function () {
              return {
                xAxes: {
                  push: jest.fn(),
                },
                yAxes: {
                  push: jest.fn(),
                },
                series: {
                  push: jest.fn(),
                },
              };
            },
          },
        },
      };
    },
  },
}));

jest.mock("@amcharts/amcharts5/xy", () => ({
  XYChart: {
    new: function () {
      return {
        xAxes: [],
        yAxes: [],
      };
    },
  },
  ValueAxis: {
    new: function () {
      return {
        renderer: {
          setStroke: jest.fn(),
        },
      };
    },
  },
  AxisRendererX: {
    new: function () {
      return {
        setStroke: jest.fn(),
      };
    },
  },
  AxisRendererY: {
    new: function () {
      return {
        setStroke: jest.fn(),
      };
    },
  },
  LineSeries: {
    new: function () {
      return {
        data: {
          setAll: jest.fn(),
        },
      };
    },
  },
}));

afterAll(() => {
  // delete all running timers
  jest.clearAllTimers();

  // clear all mocks
  jest.clearAllMocks();
});
