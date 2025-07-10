import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/App";
import { HomePage } from "@/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
