
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ErvaFormProps {
  novaErva: {
    titulo: string;
    subtitulo: string;
    texto: string;
    imagem: File | null;
  };
  onErvaChange: (erva: { titulo: string; subtitulo: string; texto: string; imagem: File | null }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ErvasForm = ({ novaErva, onErvaChange, onSubmit }: ErvaFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      <div>
        <Label htmlFor="titulo" className="text-left">Título</Label>
        <Input
          id="titulo"
          value={novaErva.titulo}
          onChange={(e) =>
            onErvaChange({ ...novaErva, titulo: e.target.value })
          }
          maxLength={100}
          required
        />
      </div>
      <div>
        <Label htmlFor="subtitulo" className="text-left">Subtítulo</Label>
        <Input
          id="subtitulo"
          value={novaErva.subtitulo}
          onChange={(e) =>
            onErvaChange({ ...novaErva, subtitulo: e.target.value })
          }
          maxLength={200}
          required
        />
      </div>
      <div>
        <Label htmlFor="texto" className="text-left">Texto</Label>
        <Textarea
          id="texto"
          value={novaErva.texto}
          onChange={(e) =>
            onErvaChange({ ...novaErva, texto: e.target.value })
          }
          maxLength={2000}
          className="min-h-[200px]"
          required
        />
        <p className="mt-1 text-sm text-gray-500 text-left">
          {novaErva.texto.length}/2000 caracteres
        </p>
      </div>
      <div>
        <Label htmlFor="imagem" className="text-left">Imagem</Label>
        <Input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files &&
            onErvaChange({ ...novaErva, imagem: e.target.files[0] })
          }
          required={!novaErva.imagem}
        />
      </div>
      <Button type="submit" className="w-full">
        Salvar Erva
      </Button>
    </form>
  );
};

export default ErvasForm;
