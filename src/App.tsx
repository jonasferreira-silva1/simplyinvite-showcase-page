
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TalentPanel from "./pages/TalentPanel";
import EvaluationPanel from "./pages/EvaluationPanel";
import ManagerPanel from "./pages/ManagerPanel";
import TalentAuth from "./pages/TalentAuth";
import HRAuth from "./pages/HRAuth";
import ManagerAuth from "./pages/ManagerAuth";

// Talent Panel Pages
import TalentProfile from "./pages/talent/TalentProfile";
import TalentSubmissions from "./pages/talent/TalentSubmissions";
import TalentFeedback from "./pages/talent/TalentFeedback";
import TalentProgress from "./pages/talent/TalentProgress";
import TalentInvitations from "./pages/talent/TalentInvitations";

// HR Panel Pages
import HRPendingProjects from "./pages/hr/HRPendingProjects";
import HREvaluationHistory from "./pages/hr/HREvaluationHistory";
import HRMessages from "./pages/hr/HRMessages";
import HRProfile from "./pages/hr/HRProfile";
import HRReports from "./pages/hr/HRReports";

// Manager Panel Pages
import ManagerExplore from "./pages/manager/ManagerExplore";
import ManagerFavorites from "./pages/manager/ManagerFavorites";
import ManagerInterviews from "./pages/manager/ManagerInterviews";
import ManagerCompany from "./pages/manager/ManagerCompany";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Auth Routes */}
              <Route path="/jovem-auth" element={<TalentAuth />} />
              <Route path="/rh-auth" element={<HRAuth />} />
              <Route path="/gestor-auth" element={<ManagerAuth />} />
              
              {/* Talent Panel Routes */}
              <Route path="/jovem" element={<TalentPanel />} />
              <Route path="/jovem/perfil" element={<TalentProfile />} />
              <Route path="/jovem/submissoes" element={<TalentSubmissions />} />
              <Route path="/jovem/feedbacks" element={<TalentFeedback />} />
              <Route path="/jovem/evolucao" element={<TalentProgress />} />
              <Route path="/jovem/convites" element={<TalentInvitations />} />
              
              {/* HR Panel Routes */}
              <Route path="/rh" element={<EvaluationPanel />} />
              <Route path="/rh/projetos-pendentes" element={<HRPendingProjects />} />
              <Route path="/rh/historico" element={<HREvaluationHistory />} />
              <Route path="/rh/mensagens" element={<HRMessages />} />
              <Route path="/rh/perfil" element={<HRProfile />} />
              <Route path="/rh/relatorios" element={<HRReports />} />
              
              {/* Manager Panel Routes */}
              <Route path="/gestor" element={<ManagerPanel />} />
              <Route path="/gestor/explorar" element={<ManagerExplore />} />
              <Route path="/gestor/favoritos" element={<ManagerFavorites />} />
              <Route path="/gestor/entrevistas" element={<ManagerInterviews />} />
              <Route path="/gestor/empresa" element={<ManagerCompany />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
