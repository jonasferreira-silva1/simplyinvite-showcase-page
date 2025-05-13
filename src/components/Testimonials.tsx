
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  age?: string;
  role: string;
  quote: string;
  avatar: string;
  institution?: string;
  isSuccess?: boolean;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, age, role, quote, avatar, institution, isSuccess }) => {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="pt-6 px-6">
        <div className="flex items-start mb-4">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-si-blue">{name} {age && <span className="text-gray-500">({age})</span>}</p>
            <p className="text-sm text-gray-500">{role}</p>
            {institution && <p className="text-xs text-si-accent font-medium">{institution}</p>}
            {isSuccess && (
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-600 italic">{quote}</p>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ana",
      role: "Desenvolvedora Frontend",
      quote: "A plataforma mudou minha vida! Consegui meu primeiro emprego enquanto ainda estudava na UNINASSAU.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      institution: "UNINASSAU",
      isSuccess: true
    },
    {
      name: "João",
      role: "Analista de Dados",
      quote: "Sou muito grato à UFPE e à plataforma por me abrirem tantas portas.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      institution: "UFPE",
      isSuccess: true
    },
    {
      name: "Fernanda Lima",
      role: "Designer UX",
      quote: "Graças à parceria da Universidade Católica com a plataforma, tive acesso a oportunidades incríveis.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      institution: "Universidade Católica",
      isSuccess: true
    },
    {
      name: "Carlos",
      role: "CEO",
      quote: "Encontrei perfis qualificados e já avaliados, economizando tempo e recursos no processo seletivo.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-si-blue mb-4">Histórias de Sucesso</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja como o SimplyInvite está transformando carreiras e processos de seleção.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
