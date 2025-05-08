
import React from "react";
import { Link } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarGroup
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Home, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserPanelLayoutProps {
  children: React.ReactNode;
  userName: string;
  userType: "talent" | "hr" | "manager";
  userImage?: string;
}

const UserPanelLayout = ({ children, userName, userType, userImage }: UserPanelLayoutProps) => {
  const getUserInitials = () => {
    return userName
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  const userTypeLabel = {
    talent: "Jovem Talento",
    hr: "Profissional RH",
    manager: "Gestor"
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="py-4">
            <div className="flex flex-col items-center justify-center gap-2 px-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userImage} alt={userName} />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">{userTypeLabel[userType]}</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-2">
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Painel">
                    <Link to={`/${userType === "talent" ? "jovem" : userType === "hr" ? "rh" : "gestor"}`}>
                      <Home />
                      <span>Painel Principal</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Perfil">
                    <Link to="#">
                      <User />
                      <span>Meu Perfil</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Notificações">
                    <Link to="#">
                      <Bell />
                      <span>Notificações</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Configurações">
                    <Link to="#">
                      <Settings />
                      <span>Configurações</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="py-2">
            <SidebarSeparator />
            <div className="p-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <div className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">SimplyInvite</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserPanelLayout;
