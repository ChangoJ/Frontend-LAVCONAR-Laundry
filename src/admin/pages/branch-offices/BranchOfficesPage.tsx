import { useState } from "react";
import {
  Plus,
  Search,
  Building2,
  MapPin,
  Phone,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router";
import { useBranchOfficesQuery } from "../../hook/branch-office/useBranchOfficesQuery";
import { useDeleteBranchOfficeMutation } from "../../hook/branch-office/useDeleteBranchOfficeMutation";
import type { BranchOffice } from "../../interfaces/branch-office/branch-office.interface";

export const BranchOfficesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: branchOfficesData,
    isLoading,
    isError,
  } = useBranchOfficesQuery();
  const deleteMutation = useDeleteBranchOfficeMutation();

  const branchOffices = branchOfficesData?.data || [];

  // Filtrar sucursales por término de búsqueda
  const filteredBranchOffices = branchOffices.filter(
    (branchOffice) =>
      branchOffice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branchOffice.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branchOffice.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando sucursales...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">No se pudieron cargar las sucursales</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Gestión de Sucursales</h1>
            <p className="text-gray-600">
              Administra las sucursales del sistema
            </p>
          </div>
        </div>
        <Link to="/admin/branch-offices/create">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Sucursal
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sucursales
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{branchOffices.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sucursales Activas
            </CardTitle>
            <Badge variant="default" className="text-xs">
              Activas
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                branchOffices.filter((office) => office.status === "ACTIVE")
                  .length
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sucursales Inactivas
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              Inactivas
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                branchOffices.filter((office) => office.status === "INACTIVE")
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, código o dirección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBranchOffices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-gray-500"
                    >
                      {searchTerm
                        ? "No se encontraron sucursales con ese criterio"
                        : "No hay sucursales registradas"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBranchOffices.map((branchOffice: BranchOffice) => (
                    <TableRow key={branchOffice.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-blue-600" />
                          {branchOffice.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {branchOffice.code || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {branchOffice.address || "Sin dirección"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {branchOffice.phone || "Sin teléfono"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            branchOffice.status === "ACTIVE"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {branchOffice.status === "ACTIVE"
                            ? "Activa"
                            : "Inactiva"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/branch-offices/${branchOffice.id}/edit`}
                          >
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  ¿Eliminar sucursal?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará
                                  permanentemente la sucursal "
                                  {branchOffice.name}" del sistema.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(branchOffice.id)}
                                  disabled={deleteMutation.isPending}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {deleteMutation.isPending
                                    ? "Eliminando..."
                                    : "Eliminar"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BranchOfficesPage;
