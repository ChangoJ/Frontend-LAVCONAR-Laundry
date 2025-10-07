import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import AdminLayout from "@/admin/layouts/AdminLayout";

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
