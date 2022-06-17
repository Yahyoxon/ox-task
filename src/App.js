import { useEffect } from "react";
import { lazy, Suspense, useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Context } from "./components/context/Context";

function App() {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const Home = lazy(() => import("./pages/Home/index"));
  const Login = lazy(() => import("./pages/Login/index"));

  const routes = [
    { path: "/", element: Home },
    { path: "/login", element: Login },
  ];

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      navigate("/login");
    }
  }, [user]);
  
  
  
  return (
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
  );
}

export default App;
