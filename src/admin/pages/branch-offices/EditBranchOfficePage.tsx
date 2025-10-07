import { useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Building2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { useBranchOfficeQuery } from "../../hook/branch-office/useBranchOfficeQuery";
import { useUpdateBranchOfficeMutation } from "../../hook/branch-office/useUpdateBranchOfficeMutation";
import type { UpdateBranchOfficeData } from "../../interfaces/branch-office/branch-office.interface";
import { Select } from "@/components/ui/select";

// Schema de validación con Zod
const updateBranchOfficeSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  code: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 20, {
      message: "El código no puede exceder 20 caracteres",
    }),
  address: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 200, {
      message: "La dirección no puede exceder 200 caracteres",
    }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 20, {
      message: "El teléfono no puede exceder 20 caracteres",
    }),
  status: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 20, {
      message: "El estado no puede exceder 20 caracteres",
    }),
});

type UpdateBranchOfficeFormData = z.infer<typeof updateBranchOfficeSchema>;

export const EditBranchOfficePage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: branchOfficeData,
    isLoading,
    isError,
  } = useBranchOfficeQuery(id!);
  const updateMutation = useUpdateBranchOfficeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<UpdateBranchOfficeFormData>({
    resolver: zodResolver(updateBranchOfficeSchema),
    mode: "onChange",
  });

  // Cargar datos cuando estén disponibles
  useEffect(() => {
    if (branchOfficeData?.data) {
      const branchOffice = branchOfficeData.data;
      setValue("name", branchOffice.name);
      setValue("code", branchOffice.code || "");
      setValue("address", branchOffice.address || "");
      setValue("phone", branchOffice.phone || "");
      setValue("status", branchOffice.status || "");
    }
  }, [branchOfficeData, setValue]);

  const onSubmit = (data: UpdateBranchOfficeFormData) => {
    if (!id) return;

    const updateData: UpdateBranchOfficeData = {
      name: data.name,
      code: data.code || undefined,
      address: data.address || undefined,
      phone: data.phone || undefined,
      status: data.status || undefined,
    };

    updateMutation.mutate({ id, data: updateData });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando sucursal...</p>
        </div>
      </div>
    );
  }

  if (isError || !branchOfficeData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">No se pudo cargar la sucursal</p>
          <Link to="/admin/branch-offices">
            <Button className="mt-4">Volver a la lista</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/branch-offices">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Editar Sucursal</h1>
            <p className="text-gray-600">
              Modifica la información de "{branchOfficeData.data.name}"
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Sucursal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nombre */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nombre <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Ingrese el nombre de la sucursal"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Código */}
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  placeholder="Código único de la sucursal (opcional)"
                  {...register("code")}
                  className={errors.code ? "border-red-500" : ""}
                />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>

              {/* Dirección */}
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  placeholder="Dirección completa de la sucursal"
                  {...register("address")}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="Número de teléfono de contacto"
                  {...register("phone")}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Estado */}
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select {...register("status")}>
                  <option value="ACTIVE">Activo</option>
                  <option value="INACTIVE">Inactivo</option>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-500">
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={!isValid || updateMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {updateMutation.isPending
                    ? "Guardando..."
                    : "Guardar Cambios"}
                </Button>
                <Link to="/admin/branch-offices">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditBranchOfficePage;
