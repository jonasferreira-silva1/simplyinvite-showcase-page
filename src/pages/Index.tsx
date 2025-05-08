
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      {/* Hero Section button links */}
      <div className="absolute bottom-24 left-0 right-0 z-30 flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-si-accent hover:bg-si-accent/90 text-white px-8 py-6 text-lg" asChild>
          <Link to="/jovem">Sou Jovem – Quero Me Apresentar</Link>
        </Button>
        <Button className="bg-white text-si-blue hover:bg-gray-100 px-8 py-6 text-lg" asChild>
          <Link to="/rh">Sou RH – Avaliar Projetos</Link>
        </Button>
        <Button className="bg-si-blue hover:bg-si-blue/80 text-white border border-white px-8 py-6 text-lg" asChild>
          <Link to="/gestor">Sou Chefe – Buscar Talentos</Link>
        </Button>
      </div>
      
      <HowItWorks />
      <Testimonials />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Index;
