import React, { useEffect, Suspense } from "react";
import { useLocation } from "react-router";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
const DeleteAlgorithm = React.lazy(() => import("./pages/DeleteAlgorithm"));

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = useSelector<{ auth: { isLoggedIn: boolean } }>(
    (state) => state.auth.isLoggedIn
  ) as boolean;

  useEffect(() => {
    if (pathname === "/") {
      navigate("/trading");
    }
  }, [navigate, pathname]);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/algorithms"
            element={isLoggedIn ? <AllAlgorithms /> : <Auth />}
          />
          <Route
            path="/algorithms/:algorithmId"
            element={isLoggedIn ? <AlgorithmDetail /> : <Auth />}
          />
          <Route
            path="/algorithms/:algorithmId/edit"
            element={isLoggedIn ? <EditAlgorithm /> : <Auth />}
          />
          <Route
            path="/algorithms/:algorithmId/delete"
            element={isLoggedIn ? <DeleteAlgorithm /> : <Auth />}
          />
          <Route
            path="/add-algorithm"
            element={isLoggedIn ? <AddAlgorithm /> : <Auth />}
          />
          <Route path="/auth" element={isLoggedIn ? <Main /> : <Auth />} />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Auth />}
          />
          <Route path="/trading" element={<Main />} />
          <Route path="/trading/:ticker" element={<Stock />} />
          <Route path="*" element={<NotFound text="Page not found!" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
