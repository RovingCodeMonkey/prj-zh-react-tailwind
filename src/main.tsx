import React from "react";
import ReactDOM from "react-dom/client";

import Root from "./routes/root";
import Customers from "./routes/customers";
import Addresses from "./routes/addresses";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Customers />,
      },
      {
        path: "/customers/:customerId/addresses",
        element: <Addresses />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
