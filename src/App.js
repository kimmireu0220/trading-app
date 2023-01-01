import { Route, Switch, Redirect } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Stock from "./pages/Stock";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/trading" />
        </Route>
        <Route path="/trading" exact>
          <div className="centered">Main Page</div>
        </Route>
        <Route path="/trading/:ticker">
          <Stock />
        </Route>
        <Route path="/algorithm" exact>
          <div className="centered">Algorithm Page</div>
        </Route>
        <Route path="*">
          <NotFound text="Page not found!" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
