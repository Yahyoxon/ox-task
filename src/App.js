import React, { useEffect } from "react";
import { get } from "lodash";
import { lazy, Suspense, useContext } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Context } from "./components/context/Context";
import LayoutContainer from "./components/Layout/Layout";

function App() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const Home = lazy(() => import("./pages/Home/index"));
  const Filter = lazy(() => import("./pages/Filter/index"));
  const Login = lazy(() => import("./pages/Login/index"));

  const routes = [
    { path: "/", element: Home },
    { path: "/filter", element: Filter },
    { path: "/login", element: Login },
  ];

  useEffect(() => {
    if (user && get(location, "pathname") === "/login") {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (!user) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <LayoutContainer>
      <Suspense fallback={"loading ...."}>
        <Routes>
          {routes.map((route, key) => {
            const RouteComponent = route.element;
            return (
              <Route key={key} path={route.path} element={<RouteComponent />} />
            );
          })}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </LayoutContainer>
  );
}

export default App;
