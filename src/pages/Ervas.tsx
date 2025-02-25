
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Interface para tipo de dados locais
interface Erva {
  id: number;
  titulo: string;
  subtitulo: string;
  texto: string;
  imagem: string;
}

const Ervas = () => {
  const [ervas, setErvas] = useState<Erva[]>([]);
  
  // Simula o carregamento de dados locais
  useEffect(() => {
    const carregarErvasLocais = () => {
      const ervasLocais: Erva[] = [
        {
          id: 1,
          titulo: "Alecrim",
          subtitulo: "Rosmarinus officinalis",
          texto: "Purificação e proteção.",
          imagem: "/placeholder.svg"
        },
        {
          id: 2,
          titulo: "Arruda",
          subtitulo: "Ruta graveolens",
          texto: "Limpeza energética e afastamento de energias negativas.",
          imagem: "/placeholder.svg"
        },
        {
          id: 3,
          titulo: "Guiné",
          subtitulo: "Petiveria alliacea",
          texto: "Proteção espiritual e limpeza.",
          imagem: "/placeholder.svg"
        },
        {
          id: 4,
          titulo: "Espada-de-São-Jorge",
          subtitulo: "Sansevieria trifasciata",
          texto: "Defesa contra negatividade.",
          imagem: "/placeholder.svg"
        },
        {
          id: 5,
          titulo: "Manjericão",
          subtitulo: "Ocimum basilicum",
          texto: "Atrai prosperidade e harmonia.",
          imagem: "/placeholder.svg"
        },
        {
          id: 6,
          titulo: "Alfazema",
          subtitulo: "Lavandula angustifolia",
          texto: "Calmante e equilibradora.",
          imagem: "/placeholder.svg"
        },
        {
          id: 7,
          titulo: "Hortelã",
          subtitulo: "Mentha spicata",
          texto: "Revitalização e clareza mental.",
          imagem: "/placeholder.svg"
        },
        {
          id: 8,
          titulo: "Boldo",
          subtitulo: "Plectranthus barbatus",
          texto: "Purificação e limpeza interna.",
          imagem: "/placeholder.svg"
        },
        {
          id: 9,
          titulo: "Eucalipto",
          subtitulo: "Eucalyptus globulus",
          texto: "Proteção e limpeza energética.",
          imagem: "/placeholder.svg"
        },
        {
          id: 10,
          titulo: "Poejo",
          subtitulo: "Mentha pulegium",
          texto: "Afastamento de energias negativas.",
          imagem: "/placeholder.svg"
        },
        {
          id: 11,
          titulo: "Sálvia",
          subtitulo: "Salvia officinalis",
          texto: "Purificação e sabedoria.",
          imagem: "/placeholder.svg"
        },
        {
          id: 12,
          titulo: "Camomila",
          subtitulo: "Matricaria chamomilla",
          texto: "Calmante e harmonizadora.",
          imagem: "/placeholder.svg"
        },
        {
          id: 13,
          titulo: "Capim-cidreira",
          subtitulo: "Cymbopogon citratus",
          texto: "Relaxamento e tranquilidade.",
          imagem: "/placeholder.svg"
        },
        {
          id: 14,
          titulo: "Erva-doce",
          subtitulo: "Pimpinella anisum",
          texto: "Harmonia e proteção.",
          imagem: "/placeholder.svg"
        },
        {
          id: 15,
          titulo: "Jasmim",
          subtitulo: "Jasminum officinale",
          texto: "Atrai amor e paz.",
          imagem: "/placeholder.svg"
        },
        {
          id: 16,
          titulo: "Comigo-ninguém-pode",
          subtitulo: "Dieffenbachia seguine",
          texto: "Proteção poderosa.",
          imagem: "/placeholder.svg"
        },
        {
          id: 17,
          titulo: "Folha-da-fortuna",
          subtitulo: "Kalanchoe pinnata",
          texto: "Prosperidade e proteção.",
          imagem: "/placeholder.svg"
        },
        {
          id: 18,
          titulo: "Pinhão-roxo",
          subtitulo: "Jatropha gossypiifolia",
          texto: "Proteção e afastamento de energias ruins.",
          imagem: "/placeholder.svg"
        },
        {
          id: 19,
          titulo: "Samambaia",
          subtitulo: "Nephrolepis exaltata",
          texto: "Purificação e proteção.",
          imagem: "/placeholder.svg"
        },
        {
          id: 20,
          titulo: "Rosa-branca",
          subtitulo: "Rosa alba",
          texto: "Paz e amor incondicional.",
          imagem: "/placeholder.svg"
        }
      ];
      setErvas(ervasLocais);
    };
    
    carregarErvasLocais();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Ervas Sagradas</h1>
        {ervas.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma erva cadastrada ainda.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ervas.map((erva) => (
              <Card key={erva.id}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{erva.titulo}</CardTitle>
                </CardHeader>
                <div className="relative h-48 w-full">
                  <img
                    src={erva.imagem}
                    alt={erva.titulo}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="mb-2 font-medium">{erva.subtitulo}</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {erva.texto}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Ervas;
