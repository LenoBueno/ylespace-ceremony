
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FrenteFormProps {
  novaFrente: {
    titulo: string;
    descricao: string;
    imagem: File | null;
  };
  onFrenteChange: (frente: { titulo: string; descricao: string; imagem: File | null }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FrenteForm = ({ novaFrente, onFrenteChange, onSubmit }: FrenteFormProps) => {
  const handleImagemFrente = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFrenteChange({ ...novaFrente, imagem: e.target.files[0] });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          value={novaFrente.titulo}
          onChange={(e) =>
            onFrenteChange({ ...novaFrente, titulo: e.target.value })
          }
          maxLength={50}
        />
      </div>
      <div>
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={novaFrente.descricao}
          onChange={(e) =>
            onFrenteChange({ ...novaFrente, descricao: e.target.value })
          }
          maxLength={200}
          className="h-20"
        />
        <p className="mt-1 text-sm text-gray-500">
          {novaFrente.descricao.length}/200 caracteres
        </p>
      </div>
      <div>
        <Label htmlFor="imagem">Imagem</Label>
        <Input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={handleImagemFrente}
        />
      </div>
      <Button type="submit" className="w-full">
        Salvar Frente
      </Button>
    </form>
  );
};

export default FrenteForm;
