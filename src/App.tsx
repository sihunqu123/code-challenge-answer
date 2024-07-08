import React from "react";
import "./App.css";
import "./App.less";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import { routes } from "./app/routes/routes";
import ErrorPage from "./pages/error/ErrorPage";

const App: React.FC = () => {
  // const [isPublic, setIsPublic] = useState<boolean>(true);

  return (
    <div>
      <ReactRoutes>
        {routes.map(({ layout: Layout, routes: subRoutes }, index) => {
          return (
            <Route key={index} element={<Layout />}>
              {subRoutes.map(({ component: Component, path, name }) => {
                return (
                  Component &&
                  path && (
                    <Route key={name} element={<Component />} path={path} />
                  )
                );
              })}
            </Route>
          );
        })}
        <Route path='*' element={<ErrorPage />} />
      </ReactRoutes>
    </div>
  );
};

export default App;
