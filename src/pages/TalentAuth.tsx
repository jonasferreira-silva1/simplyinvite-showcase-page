
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import DevModeLogin from "@/components/auth/DevModeLogin";
import { isSupabaseConfigured } from "@/backend/database/supabase";

const TalentAuth = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const navigate = useNavigate();
  const showDevMode = import.meta.env.DEV && !isSupabaseConfigured();

  const handleClose = () => {
    setIsAuthOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
      {showDevMode && <DevModeLogin />}
      
      <AuthForm
        userType="talent"
        isOpen={isAuthOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default TalentAuth;
