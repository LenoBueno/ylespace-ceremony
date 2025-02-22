
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface SobreFormProps {
  sobre: {
    texto: string;
    imagem: File | null;
  };
  onSobreChange: (sobre: { texto: string; imagem: File | null }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SobreForm = ({ sobre, onSobreChange, onSubmit }: SobreFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="sobreTexto">Texto</Label>
        <Textarea
          id="sobreTexto"
          value={sobre.texto}
          onChange={(e) => onSobreChange({ ...sobre, texto: e.target.value })}
          className="min-h-[200px]"
        />
      </div>
      <div>
        <Label htmlFor="sobreImagem">Imagem (Assinatura)</Label>
        <Input
          id="sobreImagem"
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files &&
            onSobreChange({ ...sobre, imagem: e.target.files[0] })
          }
        />
      </div>
      <Button type="submit" className="w-full">
        Salvar Sobre
      </Button>
    </form>
  );
};

export default SobreForm;
