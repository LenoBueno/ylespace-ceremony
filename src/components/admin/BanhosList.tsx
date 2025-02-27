
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface BanhosListProps {
  banhos: Array<{
    id: number;
    titulo: string;
    subtitulo: string;
    ervas: string[];
    imagem: string;
  }>;
  onDelete?: (id: number) => void;
}

const BanhosList = ({ banhos, onDelete }: BanhosListProps) => {
  if (banhos.length === 0) {
    return <p className="text-center text-muted-foreground">Nenhum banho cadastrado ainda.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Banhos Cadastrados</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {banhos.map((banho) => (
          <Card key={banho.id}>
            <div className="relative">
              <img
                src={banho.imagem}
                alt={banho.titulo}
                className="h-40 w-full object-cover"
              />
              {onDelete && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => onDelete(banho.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold">{banho.titulo}</h4>
              <p className="text-sm text-muted-foreground">{banho.subtitulo}</p>
              <div className="mt-2">
                <p className="font-medium text-xs">Ervas:</p>
                <div className="flex flex-wrap gap-1 mt-1">
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
    </div>
  );
};

export default BanhosList;
