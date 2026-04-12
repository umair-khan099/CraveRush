import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/app.route.jsx";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />,
);
