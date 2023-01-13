import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import AlgorithmContextProvider from "./store/AlgorithmContextProvider";
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AlgorithmContextProvider>
        <App />
      </AlgorithmContextProvider>
    </Provider>
  </BrowserRouter>
);
