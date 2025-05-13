
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";

// Páginas de autenticação
import TalentAuth from "@/pages/TalentAuth";
import HRAuth from "@/pages/HRAuth";
import ManagerAuth from "@/pages/ManagerAuth";

// Páginas principais
import TalentPanel from "@/pages/TalentPanel";
import EvaluationPanel from "@/pages/EvaluationPanel";
import ManagerPanel from "@/pages/ManagerPanel";

// Páginas de perfil
import TalentProfile from "@/pages/talent/TalentProfile";
import HRProfile from "@/pages/hr/HRProfile";

// Páginas de onboarding
import TalentOnboardingForm from "@/pages/talent/TalentOnboardingForm";

// Páginas de submissões
import TalentSubmissions from "@/pages/talent/TalentSubmissions";
import HRPendingProjects from "@/pages/hr/HRPendingProjects";

// Páginas de feedback
import TalentFeedback from "@/pages/talent/TalentFeedback";
import HREvaluationHistory from "@/pages/hr/HREvaluationHistory";

// Páginas de mensagens
import HRMessages from "@/pages/hr/HRMessages";

// Páginas de exploração
import ManagerExplore from "@/pages/manager/ManagerExplore";
import ManagerFavorites from "@/pages/manager/ManagerFavorites";

// Páginas de relatórios
import HRReports from "@/pages/hr/HRReports";

// Página inicial
import Index from "@/pages/Index";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rota inicial */}
          <Route path="/" element={<Index />} />

          {/* Rotas de autenticação */}
          <Route path="/jovem-auth" element={<TalentAuth />} />
          <Route path="/rh-auth" element={<HRAuth />} />
          <Route path="/gestor-auth" element={<ManagerAuth />} />

          {/* Rotas do Jovem */}
          <Route path="/jovem" element={<TalentPanel />} />
          <Route path="/jovem/onboarding" element={<TalentOnboardingForm />} />
          <Route path="/jovem/perfil" element={<TalentProfile />} />
          <Route path="/jovem/submissoes" element={<TalentSubmissions />} />
          <Route path="/jovem/feedbacks" element={<TalentFeedback />} />

          {/* Rotas do RH */}
          <Route path="/rh" element={<EvaluationPanel />} />
          <Route path="/rh/perfil" element={<HRProfile />} />
          <Route
            path="/rh/projetos-pendentes"
            element={<HRPendingProjects />}
          />
          <Route path="/rh/historico" element={<HREvaluationHistory />} />
          <Route path="/rh/mensagens" element={<HRMessages />} />
          <Route path="/rh/relatorios" element={<HRReports />} />

          {/* Rotas do Gestor */}
          <Route path="/gestor" element={<ManagerPanel />} />
          <Route path="/gestor/explorar" element={<ManagerExplore />} />
          <Route path="/gestor/favoritos" element={<ManagerFavorites />} />

          {/* Rota de fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
};

export default App;
