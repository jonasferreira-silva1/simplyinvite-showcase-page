
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

const ManagerAuth = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAuthOpen(false);
    navigate('/');
  };

  const handleSubmit = (data: any) => {
    console.log("Manager auth data:", data);
    // Here you would handle authentication logic
    // For now, just navigate to the manager panel
    navigate('/gestor');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <AuthForm
        userType="manager"
        isOpen={isAuthOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ManagerAuth;
