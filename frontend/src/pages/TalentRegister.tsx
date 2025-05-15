// @ts-ignore - Ignore React type issues
import React, { useState, useEffect } from "react";
// @ts-ignore - Ignore Router type issues
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// @ts-ignore - Ignore lucide type issues
import { X } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";

const TalentRegister = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleSuccess = () => {
    // O redirecionamento é feito automaticamente pelo AuthForm
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3')" }}
      >
        <div className="absolute inset-0 bg-si-blue/75 z-10"></div>
      </div>
      {/* Modal */}
      <div className="fixed left-[50%] top-[50%] z-20 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Cadastro de Jovem Talento</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <AuthForm 
          userType="talent"
          isOpen={true}
          onClose={handleClose}
          onSubmit={handleSuccess}
          initialMode="register"
        />
      </div>
    </div>
  );
};

export default TalentRegister; 