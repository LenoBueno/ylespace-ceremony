
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PerfilFormProps {
  novoPerfil: {
    nome: string;
    orixa: string;
    nascimento: string;
    batizado: string;
    imagem: File | null;
  };
  onPerfilChange: (perfil: {
    nome: string;
    orixa: string;
    nascimento: string;
    batizado: string;
    imagem: File | null;
  }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PerfilForm = ({ novoPerfil, onPerfilChange, onSubmit }: PerfilFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          value={novoPerfil.nome}
          onChange={(e) =>
            onPerfilChange({ ...novoPerfil, nome: e.target.value })
          }
          maxLength={100}
          required
        />
      </div>
      <div>
        <Label htmlFor="orixa">Orixá</Label>
        <Input
          id="orixa"
          value={novoPerfil.orixa}
          onChange={(e) =>
            onPerfilChange({ ...novoPerfil, orixa: e.target.value })
          }
          maxLength={100}
          required
        />
      </div>
      <div>
        <Label htmlFor="nascimento">Data de Nascimento</Label>
        <Input
          id="nascimento"
          type="date"
          value={novoPerfil.nascimento}
          onChange={(e) =>
            onPerfilChange({ ...novoPerfil, nascimento: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="batizado">Data de Batizado</Label>
        <Input
          id="batizado"
          type="date"
          value={novoPerfil.batizado}
          onChange={(e) =>
            onPerfilChange({ ...novoPerfil, batizado: e.target.value })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="imagem">Imagem</Label>
        <Input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files &&
            onPerfilChange({ ...novoPerfil, imagem: e.target.files[0] })
          }
          required={!novoPerfil.imagem}
        />
      </div>
      <Button type="submit" className="w-full">
        Salvar Perfil
      </Button>
    </form>
  );
};

export default PerfilForm;
