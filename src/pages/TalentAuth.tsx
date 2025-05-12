import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const TalentAuth = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAuthOpen(false);
    navigate("/");
  };

  if (!isAuthOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Login Jovem</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <AuthForm userType="talent" isOpen={isAuthOpen} onClose={handleClose} />
      </div>
    </div>
  );
};

export default TalentAuth;
