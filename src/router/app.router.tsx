import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";
import AdminLayout from "@/admin/layouts/AdminLayout";
import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { ProtectedRoute } from "@/components/custom/ProtectedRoute";
import { PublicRoute } from "@/components/custom/PublicRoute";

// Lazy load pages
const LoginPage = lazy(() => import("@/auth/pages/login/LoginPage"));
const DashboardPage = lazy(
  () => import("@/admin/pages/dashboard/DashboardPage")
);

export const appRouter = createBrowserRouter([
  // Ruta raíz - redirigir al dashboard si está autenticado, sino al login
  {
    path: "/",
    element: <Navigate to="/admin/dashboard" replace />,
  },

  // Rutas protegidas de administración
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      // Aquí puedes agregar más rutas protegidas
      // {
      //   path: "clients",
      //   element: <ClientsPage />,
      // },
      // {
      //   path: "guides",
      //   element: <GuidesPage />,
      // },
      // {
      //   path: "branches",
      //   element: (
      //     <ProtectedRoute requiredRole="SUPERADMIN">
      //       <BranchesPage />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },

  // Rutas públicas de autenticación
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
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

  // Ruta para manejar 404 y otras rutas no encontradas
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600 mb-4">Página no encontrada</p>
          <Navigate to="/admin/dashboard" replace />
        </div>
      </div>
    ),
  },
]);
