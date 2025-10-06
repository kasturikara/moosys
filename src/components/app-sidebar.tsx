import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  LayoutDashboardIcon,
  SparklesIcon,
  UsersRoundIcon,
} from "lucide-react";
import { useStore } from "@/store";
import { toast } from "sonner";

// menu items
const items = [
  {
    title: "Beranda",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Murid",
    url: "/murid",
    icon: UsersRoundIcon,
  },
  {
    title: "Rekomendasi",
    url: "/rekomendasi",
    icon: SparklesIcon,
  },
];

export function AppSidebar() {
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setTimeout(() => {
      toast.success("Berhasil logout");
    }, 500);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold">Moosys</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            {user && (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="text-red-600 hover:bg-red-100"
                  >
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
