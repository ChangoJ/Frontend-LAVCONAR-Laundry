import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Waves, Loader2 } from "lucide-react";
import { useBranchOffices } from "@/admin/hook/branch-office/useBranchOffices";
import { useLoginMutation } from "../../hook/useLoginMutation";

export const LoginPage = () => {
  const { data: branchOfficesData, isLoading, isError } = useBranchOffices();
  const loginMutation = useLoginMutation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [branchId, setBranchId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ identifier, password, branchId });

    if (!identifier || !password) {
      return;
    }

    loginMutation.mutate({
      username: identifier,
      password,
      branchOfficeId: branchId || undefined,
    });
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary">
          <Waves className="h-10 w-10 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold">LAVCONAR</CardTitle>
          <CardDescription>Sistema de Gestión de Lavandería</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loginMutation.isError && (
          <div className="mb-4  p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            Error al iniciar sesión. Verifica tus credenciales.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">Usuario o Correo</Label>
            <Input
              id="identifier"
              type="text"
              placeholder="usuario@lavconar.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="space-y-2 ">
            <Label htmlFor="branch">Sucursal</Label>
            <Select
              value={branchId || undefined}
              onValueChange={setBranchId}
              disabled={isLoading || isError}
            >
              <SelectTrigger id="branch">
                <SelectValue
                  placeholder={
                    isLoading ? "Cargando..." : "Selecciona una sucursal"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {branchOfficesData?.data?.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
