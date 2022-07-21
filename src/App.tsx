import React from "react";
import { useFunctionValues } from "./useFunctionValues";

function App() {
  const { values, isConnected } = useFunctionValues();

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      {JSON.stringify(values)}
    </div>
  );
}

export default App;
