import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import { isSupabaseConfigured } from "@/backend/database/supabase";

const Index = () => {
  // Mostrar cabeçalho informativo apenas em modo de desenvolvimento
  const showInfoHeader = import.meta.env.DEV && !isSupabaseConfigured();
  
  return (
    <div className="min-h-screen">
      {/* {showInfoHeader && <InfoHeader />} */}
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;
