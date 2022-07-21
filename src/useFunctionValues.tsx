import { useEffect, useReducer, useState } from "react";
import io from "socket.io-client";

const initialState = {
  values: [] as Coordinate[],
};

export interface Coordinate {
  x: number;
  y: number;
}

interface Action {
  type: string;
  payload: Coordinate;
}

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "ADD_VALUE":
      return {
        ...state,
        values: [...state.values, action.payload],
      };
    default:
      return state;
  }
};

const socket = io("https://enigmatic-garden-78129.herokuapp.com");

export const useFunctionValues = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("App connected to backend");
      setIsConnected(true);
    });

    socket?.on("disconnect", () => {
      setIsConnected(false);
    });

    socket?.on("new coordinates", (coord: Coordinate) => {
      console.log("Received new coordinates", coord);
      dispatch({ type: "ADD_VALUE", payload: coord });
    });

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("new coordinates");
    };
  });

  return {
    socket,
    isConnected,
    values: state.values,
    dispatch,
  };
};
