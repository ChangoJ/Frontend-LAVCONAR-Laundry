import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";
import AdminLayout from "@/admin/layouts/AdminLayout";
import { AuthLayout } from "@/auth/layouts/AuthLayout";

const LoginPage = lazy(() => import("@/auth/pages/login/LoginPage"));

export const appRouter = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
