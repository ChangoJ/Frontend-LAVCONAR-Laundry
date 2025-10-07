import { createBrowserRouter } from "react-router";
import { AdminLayout } from "../admin/layouts/AdminLayout";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/auth/pages/login/LoginPage"));

export const appRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);
