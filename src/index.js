import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import AlgorithmContextProvider from "./store/AlgorithmContextProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AlgorithmContextProvider>
      <App />
    </AlgorithmContextProvider>
  </BrowserRouter>
);
