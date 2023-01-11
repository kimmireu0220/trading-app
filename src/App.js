import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const Main = React.lazy(() => import("./pages/Main"));
const Stock = React.lazy(() => import("./pages/Stock"));
const AllAlgorithms = React.lazy(() => import("./pages/AllAlgorithms"));
const AlgorithmDetail = React.lazy(() => import("./pages/AlgorithmDetail"));
const EditAlgorithm = React.lazy(() => import("./pages/EditAlgorithm"));
const DeleteAlgorithm = React.lazy(() =>
  import("./components/Algorithm/DeleteAlgorithm")
);
const AddAlgorithm = React.lazy(() => import("./pages/AddAlgorithm"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
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
          <Route path="/algorithms/:algorithmId/edit">
            <EditAlgorithm />
          </Route>
          <Route path="/algorithms/:algorithmId/delete">
            <DeleteAlgorithm />
          </Route>
          <Route path="/add-algorithm">
            <AddAlgorithm />
          </Route>
          <Route path="*">
            <NotFound text="Page not found!" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
