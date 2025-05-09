import React, { lazy } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout.tsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout Page={lazy(() => import("./pages/Home"))} />,
  },
  {
    path: "/cart",
    element: <Layout Page={lazy(() => import("./pages/Cart"))} />,
  },
]);

const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
