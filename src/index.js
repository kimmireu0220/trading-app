import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AlgorithmContextProvider from "./store/AlgorithmContextProvider";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AlgorithmContextProvider>
      <App />
    </AlgorithmContextProvider>
  </BrowserRouter>
);
