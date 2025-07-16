import "./index.css";
import HydrogenLayout from "@layouts/hydrogen/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "./view/404";
import { getRoutes, IRoute } from "./utils/routes";
import { Suspense } from "react";
import { PublicRoute, TokenProtectedRoutes } from "./utils/protectedRoutes";
import { Loading } from "./components/shared/loader";

const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<TokenProtectedRoutes />}>
            <Route element={<HydrogenLayout />}>
              {mapRoutes(
                getRoutes("tokenProtected").filter((route) => route.sidebar)
              )}
            </Route>
            {mapRoutes(
              getRoutes("tokenProtected").filter((route) => !route.sidebar)
            )}
          </Route>
          <Route element={<PublicRoute />}>
            {mapRoutes(getRoutes("unprotected"))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const mapRoutes = (routes: IRoute[]): JSX.Element[] =>
  routes.map((route, key) => (
    <Route key={key} path={route.route} element={<route.component />} />
  ));

export default App;