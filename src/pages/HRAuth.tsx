
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import DevModeLogin from "@/components/auth/DevModeLogin";
import { isSupabaseConfigured } from "@/backend/database/supabase";
import InfoHeader from "@/components/InfoHeader";

const HRAuth = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const navigate = useNavigate();
  const showDevMode = import.meta.env.DEV && !isSupabaseConfigured();

  const handleClose = () => {
    setIsAuthOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {showDevMode && <InfoHeader />}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {showDevMode && <DevModeLogin />}
        
        <AuthForm
          userType="hr"
          isOpen={isAuthOpen}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default HRAuth;
