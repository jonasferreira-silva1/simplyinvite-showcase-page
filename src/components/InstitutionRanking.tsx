
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface Institution {
  id: number;
  name: string;
  type: "Pública" | "Privada";
  hires: number;
  location: string;
  rating: number;
}

const InstitutionRanking = () => {
  // Mock data - em um ambiente real, isso viria da API
  const institutions: Institution[] = [
    { id: 1, name: "UFPE", type: "Pública", hires: 187, location: "Recife, PE", rating: 4.8 },
    { id: 2, name: "UNINASSAU", type: "Privada", hires: 156, location: "Recife, PE", rating: 4.5 },
    { id: 3, name: "Universidade Católica de Pernambuco", type: "Privada", hires: 142, location: "Recife, PE", rating: 4.7 },
    { id: 4, name: "IFPE", type: "Pública", hires: 134, location: "Recife, PE", rating: 4.6 },
    { id: 5, name: "UPE", type: "Pública", hires: 128, location: "Recife, PE", rating: 4.5 },
    { id: 6, name: "Faculdade Senac", type: "Privada", hires: 115, location: "Recife, PE", rating: 4.2 }
  ];

  return (
    <section id="ranking" className="py-20 bg-gray-50">
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-si-blue mb-4">
            Ranking de Instituições
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Instituições que mais preparam talentos para o mercado de trabalho, com base em contratações reais feitas por meio da nossa plataforma.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-si-blue text-white">
            <CardTitle className="flex items-center justify-center text-center">
              <Trophy className="mr-2 h-6 w-6" />
              Instituições com Mais Contratações
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 text-center">Posição</TableHead>
                    <TableHead>Instituição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Contratações</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead className="text-center">Avaliação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institutions.map((institution, index) => (
                    <TableRow key={institution.id} className={index < 3 ? "bg-yellow-50" : ""}>
                      <TableCell className="text-center font-bold">
                        {index === 0 ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-white">1</span>
                        ) : index === 1 ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-white">2</span>
                        ) : index === 2 ? (
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700 text-white">3</span>
                        ) : (
                          index + 1
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{institution.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          institution.type === "Pública" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {institution.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{institution.hires}</TableCell>
                      <TableCell>{institution.location}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(institution.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-xs font-medium">{institution.rating.toFixed(1)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InstitutionRanking;
