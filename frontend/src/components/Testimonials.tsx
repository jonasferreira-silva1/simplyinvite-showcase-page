
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface TestimonialProps {
  name: string;
  age?: string;
  role: string;
  quote: string;
  avatar: string;
  institution?: string;
  isSuccess?: boolean;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  name, 
  age, 
  role, 
  quote, 
  avatar, 
  institution, 
  isSuccess,
  rating = 5
}) => {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
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
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                  />
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
      isSuccess: true,
      rating: 5
    },
    {
      name: "João",
      role: "Analista de Dados",
      quote: "Sou muito grato à UFPE e à plataforma por me abrirem tantas portas.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      institution: "UFPE",
      isSuccess: true,
      rating: 4
    },
    {
      name: "Fernanda Lima",
      role: "Designer UX",
      quote: "Graças à parceria da Universidade Católica com a plataforma, tive acesso a oportunidades incríveis.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      institution: "Universidade Católica",
      isSuccess: true,
      rating: 5
    },
    {
      name: "Carlos",
      role: "CEO",
      quote: "Encontrei perfis qualificados e já avaliados, economizando tempo e recursos no processo seletivo.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      isSuccess: true,
      rating: 5
    },
    // Adicionando mais 4 depoimentos com avaliações variadas
    {
      name: "Mariana",
      age: "22",
      role: "Desenvolvedora Backend",
      quote: "O SimplyInvite me ajudou a encontrar uma vaga ainda durante meu estágio. A experiência foi ótima, mas o processo seletivo poderia ser mais rápido.",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      institution: "IFPE",
      isSuccess: true,
      rating: 4
    },
    {
      name: "Pedro",
      age: "24",
      role: "Cientista de Dados",
      quote: "Consegui minha primeira oportunidade através da plataforma, mas senti falta de mais feedbacks durante o processo seletivo.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      institution: "UPE",
      isSuccess: true,
      rating: 3
    },
    {
      name: "Julia",
      age: "23",
      role: "Product Manager",
      quote: "Meus projetos ganharam muita visibilidade na plataforma. Recebi duas propostas de emprego em apenas duas semanas!",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      institution: "Faculdade Senac",
      isSuccess: true,
      rating: 5
    },
    {
      name: "Rafael",
      age: "25",
      role: "Engenheiro de Software",
      quote: "A interface é intuitiva, mas algumas funcionalidades poderiam ser melhoradas. De qualquer forma, consegui uma excelente oportunidade.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      institution: "CESAR School",
      isSuccess: true,
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-si-blue mb-4">Histórias de Sucesso</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Veja como o SimplyInvite está transformando carreiras e processos de seleção.
          </p>
        </div>

        {/* Versão para desktop - grid com todos os depoimentos */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        {/* Versão para mobile e tablet - carrossel */}
        <div className="lg:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1">
                    <TestimonialCard {...testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="position-static transform-none mx-2" />
              <CarouselNext className="position-static transform-none mx-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
