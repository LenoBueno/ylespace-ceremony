
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Interface para tipo de dados locais
interface Banho {
  id: number;
  titulo: string;
  subtitulo: string;
  ervas: string[];
  imagem: string;
}

const Banhos = () => {
  const [banhos, setBanhos] = useState<Banho[]>([]);
  
  // Simula o carregamento de dados locais
  useEffect(() => {
    const carregarBanhosLocais = () => {
      const banhosLocais: Banho[] = [
        {
          id: 1,
          titulo: "Banho de Limpeza",
          subtitulo: "Para purificação espiritual",
          ervas: ["Arruda", "Guiné", "Alecrim"],
          imagem: "/placeholder.svg"
        },
        {
          id: 2,
          titulo: "Banho de Prosperidade",
          subtitulo: "Para atrair abundância",
          ervas: ["Manjericão", "Canela", "Louro"],
          imagem: "/placeholder.svg"
        },
        {
          id: 3,
          titulo: "Banho de Proteção",
          subtitulo: "Para afastar energias negativas",
          ervas: ["Espada-de-São-Jorge", "Comigo-ninguém-pode", "Arruda"],
          imagem: "/placeholder.svg"
        }
      ];
      setBanhos(banhosLocais);
    };
    
    carregarBanhosLocais();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Banhos de Descarga</h1>
        {banhos.length === 0 ? (
          <p className="text-muted-foreground">Nenhum banho cadastrado ainda.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {banhos.map((banho) => (
              <Card key={banho.id}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{banho.titulo}</CardTitle>
                </CardHeader>
                <div className="relative h-40 w-full">
                  <img
                    src={banho.imagem}
                    alt={banho.titulo}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="mb-2 font-medium">{banho.subtitulo}</p>
                  <div>
                    <p className="text-sm font-medium">Ervas:</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {banho.ervas.map((erva, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                          {erva}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Banhos;
