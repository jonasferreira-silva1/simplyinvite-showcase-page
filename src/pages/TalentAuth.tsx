
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

const TalentAuth = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAuthOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <AuthForm
        userType="talent"
        isOpen={isAuthOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default TalentAuth;
