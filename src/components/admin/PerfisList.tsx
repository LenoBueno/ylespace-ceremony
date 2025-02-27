
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface PerfilsListProps {
  perfis: Array<{
    id: number;
    nome: string;
    orixa: string;
    nascimento: string;
    batizado: string;
    imagem: string;
  }>;
  onDelete?: (id: number) => void;
}

const PerfisList = ({ perfis, onDelete }: PerfilsListProps) => {
  if (perfis.length === 0) {
    return <p className="text-center text-muted-foreground">Nenhum perfil cadastrado ainda.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Perfis Cadastrados</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {perfis.map((perfil) => (
          <Card key={perfil.id}>
            <div className="relative">
              <img
                src={perfil.imagem}
                alt={perfil.nome}
                className="h-40 w-full object-cover"
              />
              {onDelete && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => onDelete(perfil.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold">{perfil.nome}</h4>
              <p className="text-sm text-muted-foreground">{perfil.orixa}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="font-medium">Nascimento:</p>
                  <p>{new Date(perfil.nascimento).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Batizado:</p>
                  <p>{new Date(perfil.batizado).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PerfisList;
