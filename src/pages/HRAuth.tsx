
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

const HRAuth = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAuthOpen(false);
    navigate('/');
  };

  const handleSubmit = (data: any) => {
    console.log("HR auth data:", data);
    // Here you would handle authentication logic
    // For now, just navigate to the HR panel
    navigate('/rh');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <AuthForm
        userType="hr"
        isOpen={isAuthOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default HRAuth;
