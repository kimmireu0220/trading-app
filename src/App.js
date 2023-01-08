import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Main from "./pages/Main";
import Stock from "./pages/Stock";
import AllAlgorithms from "./pages/AllAlgorithms";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import EditAlgorithm from "./pages/EditAlgorithm";
import NewAlgorithm from "./pages/NewAlgorithm";
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
        <Route path="/algorithms" exact>
          <AllAlgorithms />
        </Route>
        <Route path="/algorithms/:algorithmId" exact>
          <AlgorithmDetail />
        </Route>
        <Route path="/algorithms/:algorithmId/edit" exact>
          <EditAlgorithm />
        </Route>
        <Route path="/new-algorithm">
          <NewAlgorithm />
        </Route>
        <Route path="*">
          <NotFound text="Page not found!" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
