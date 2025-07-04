import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App";
import { lazy } from "react";
const About = lazy(() => import("@/components/About/About"));
const Company = lazy(() => import("@/page/Company/Company"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop",
        element: <h1>Shop</h1>,
      },
      {
        path: "/company",
        element: <Company />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
