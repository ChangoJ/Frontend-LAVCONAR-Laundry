import {
  Building2,
  Users,
  FileText,
  History,
  LogOut,
  LayoutDashboard,
  Waves,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLogoutMutation } from "@/auth/hook/useLogoutMutation";

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, hasRole } = useAuth();
  const logoutMutation = useLogoutMutation();
  const collapsed = state === "collapsed";

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const menuItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Clientes", url: "/admin/clients", icon: Users },
    { title: "Guías", url: "/admin/guides", icon: FileText },
  ];

  const adminItems = [
    {
      title: "Sucursales",
      url: "/admin/branch-offices",
      icon: Building2,
      role: "SUPERADMIN",
    },
    {
      title: "Auditoría",
      url: "/admin/audit",
      icon: History,
      role: "SUPERADMIN",
    },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Waves className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-sidebar-foreground">
                LAVCONAR
              </span>
              <span className="text-xs text-sidebar-foreground/60">
                {user?.branch_office_id
                  ? `Sucursal: ${user.branch_office_id}`
                  : "Sistema de Lavandería"}
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {(hasRole("ADMIN") || hasRole("SUPERADMIN")) && (
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems
                  .filter((item) => !item.role || hasRole(item.role))
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "hover:bg-sidebar-accent/50"
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex flex-col gap-2">
          {!collapsed && (
            <div className="px-2 py-1 text-sm text-sidebar-foreground/60">
              <p className="font-medium">{user?.username}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && (
              <span className="ml-2">
                {logoutMutation.isPending ? "Cerrando..." : "Cerrar Sesión"}
              </span>
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
