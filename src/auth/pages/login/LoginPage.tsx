import { useState, useEffect } from "react";

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
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useBrachOffices } from "@/admin/hook/useBranchOffices";

export const LoginPage = () => {
  const { data: branchOfficesData, isLoading, isError } = useBrachOffices();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!identifier || !password || !branchOfficesData?.data) {
      return;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
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

            <div className="space-y-2">
              <Label htmlFor="branch">Sucursal</Label>
              <Select disabled={isLoading || isError}>
                <SelectTrigger id="branch">
                  <SelectValue
                    placeholder={
                      isError ? "Cargando..." : "Selecciona una sucursal"
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
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
    </div>
  );
};

export default LoginPage;
