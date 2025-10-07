import { Outlet } from "react-router";
import { CustomJumbotron } from "../../components/custom/CustomJumbotron";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col  min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <CustomJumbotron
        title="LAVCONAR"
        description="Sistema de Gestión de Lavandería"
      />
      <Outlet />
    </div>
  );
};
