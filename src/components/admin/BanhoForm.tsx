
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface Erva {
  id: number;
  titulo: string;
}

interface BanhoFormProps {
  novoBanho: {
    titulo: string;
    subtitulo: string;
    ervasSelecionadas: number[];
    imagem: File | null;
  };
  ervasDisponiveis: Erva[];
  onBanhoChange: (banho: {
    titulo: string;
    subtitulo: string;
    ervasSelecionadas: number[];
    imagem: File | null;
  }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const BanhoForm = ({ novoBanho, ervasDisponiveis, onBanhoChange, onSubmit }: BanhoFormProps) => {
  const handleErvaToggle = (ervaId: number) => {
    const ervasSelecionadas = novoBanho.ervasSelecionadas.includes(ervaId)
      ? novoBanho.ervasSelecionadas.filter(id => id !== ervaId)
      : [...novoBanho.ervasSelecionadas, ervaId];
    
    onBanhoChange({
      ...novoBanho,
      ervasSelecionadas
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          value={novoBanho.titulo}
          onChange={(e) =>
            onBanhoChange({ ...novoBanho, titulo: e.target.value })
          }
          maxLength={100}
          required
        />
      </div>
      <div>
        <Label htmlFor="subtitulo">Subtítulo</Label>
        <Input
          id="subtitulo"
          value={novoBanho.subtitulo}
          onChange={(e) =>
            onBanhoChange({ ...novoBanho, subtitulo: e.target.value })
          }
          maxLength={200}
          required
        />
      </div>
      <div>
        <Label>Ervas</Label>
        <div className="mt-2 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-md p-3">
          {ervasDisponiveis.map((erva) => (
            <div key={erva.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`erva-${erva.id}`}
                checked={novoBanho.ervasSelecionadas.includes(erva.id)}
                onCheckedChange={() => handleErvaToggle(erva.id)}
              />
              <Label htmlFor={`erva-${erva.id}`} className="text-sm cursor-pointer">
                {erva.titulo}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="imagem">Imagem</Label>
        <Input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files &&
            onBanhoChange({ ...novoBanho, imagem: e.target.files[0] })
          }
          required={!novoBanho.imagem}
        />
      </div>
      <Button type="submit" className="w-full">
        Salvar Banho
      </Button>
    </form>
  );
};

export default BanhoForm;
