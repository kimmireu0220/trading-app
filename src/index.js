import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import store from "./store";
import AlgorithmContextProvider from "./store/AlgorithmContextProvider";

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
