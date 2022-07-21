import React from "react";
import { Canvas } from "./Canvas";
import { useFunctionValues } from "./useFunctionValues";

function App() {
  const { values, isConnected } = useFunctionValues();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <p>Connected: {"" + isConnected}</p>
      <Canvas values={values} />
    </div>
  );
}

export default App;
