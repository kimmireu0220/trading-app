import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Main from "./pages/Main";
import Stock from "./pages/Stock";
import Algorithm from "./pages/Algorithm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/trading" />
        </Route>
        <Route path="/trading" exact>
          <Main />
        </Route>
        <Route path="/trading/:ticker">
          <Stock />
        </Route>
        <Route path="/algorithm" exact>
          <Algorithm />
        </Route>
        <Route path="*">
          <NotFound text="Page not found!" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
