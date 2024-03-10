import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Lembretes from "./components/Lembretes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Lembretes />
    </>
  );
}

export default App;
