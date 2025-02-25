
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
    // Esta função será substituída pela integração real com o Supabase futuramente
    const carregarErvasLocais = () => {
      // Podemos adicionar dados de exemplo aqui se necessário
      const ervasLocais: Erva[] = [];
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
