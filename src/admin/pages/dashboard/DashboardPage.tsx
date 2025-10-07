import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useLogoutMutation } from "@/auth/hook/useLogoutMutation";
import { Button } from "@/components/ui/button";
import { LogOut, User, Building } from "lucide-react";

export const DashboardPage: React.FC = () => {
  const { user, hasRole } = useAuth();
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Bienvenido de vuelta, {user?.username}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {logoutMutation.isPending ? "Cerrando..." : "Cerrar Sesión"}
        </Button>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Información del Usuario
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Usuario:</span> {user?.username}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">ID:</span> {user?.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Building className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              Roles y Permisos
            </h3>
            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {user?.roles?.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Es Superadmin:</span>{" "}
                  {hasRole("SUPERADMIN") ? "Sí" : "No"}
                </p>
                <p>
                  <span className="font-medium">Es Admin:</span>{" "}
                  {hasRole("ADMIN") ? "Sí" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branch Info */}
      {user?.branch_office_id && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Información de Sucursal
          </h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">ID de Sucursal:</span>{" "}
            {user.branch_office_id}
          </p>
          {user.allowed_branches && user.allowed_branches.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">
                Sucursales Permitidas:
              </p>
              <div className="mt-1">
                {user.allowed_branches.map((branch: any, index: number) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mt-1"
                  >
                    {branch.name || branch.id || branch}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start">
            Ver Clientes
          </Button>
          <Button variant="outline" className="justify-start">
            Crear Guía
          </Button>
          <Button variant="outline" className="justify-start">
            Ver Reportes
          </Button>
          {hasRole("SUPERADMIN") && (
            <>
              <Button variant="outline" className="justify-start">
                Gestionar Sucursales
              </Button>
              <Button variant="outline" className="justify-start">
                Administrar Usuarios
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
