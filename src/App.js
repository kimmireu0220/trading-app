import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const Auth = React.lazy(() => import("./pages/Auth"));
const Main = React.lazy(() => import("./pages/Main"));
const Stock = React.lazy(() => import("./pages/Stock"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AddAlgorithm = React.lazy(() => import("./pages/AddAlgorithm"));
const EditAlgorithm = React.lazy(() => import("./pages/EditAlgorithm"));
const AllAlgorithms = React.lazy(() => import("./pages/AllAlgorithms"));
const AlgorithmDetail = React.lazy(() => import("./pages/AlgorithmDetail"));
const DeleteAlgorithm = React.lazy(() =>
  import("./components/Algorithm/DeleteAlgorithm")
);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/algorithms" exact>
            {isLoggedIn && <AllAlgorithms />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/algorithms/:algorithmId" exact>
            {isLoggedIn && <AlgorithmDetail />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/algorithms/:algorithmId/edit">
            {isLoggedIn && <EditAlgorithm />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/algorithms/:algorithmId/delete">
            {isLoggedIn && <DeleteAlgorithm />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/add-algorithm">
            {isLoggedIn && <AddAlgorithm />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/auth">
            {isLoggedIn && <Main />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/profile">
            {isLoggedIn && <Profile />}
            {!isLoggedIn && <Auth />}
          </Route>
          <Route path="/" exact>
            <Redirect to="/trading" />
          </Route>
          <Route path="/trading" exact>
            <Main />
          </Route>
          <Route path="/trading/:ticker">
            <Stock />
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
