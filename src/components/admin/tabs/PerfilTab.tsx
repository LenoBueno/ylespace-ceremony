
import React, { useState } from "react";
import PerfilForm from "@/components/admin/PerfilForm";
import PerfisList from "@/components/admin/PerfisList";

const PerfilTab = () => {
  const [novoPerfil, setNovoPerfil] = useState({
    nome: "",
    orixa: "",
    nascimento: "",
    batizado: "",
    imagem: null as File | null,
  });

  const [perfis, setPerfis] = useState<Array<{
    id: number;
    nome: string;
    orixa: string;
    nascimento: string;
    batizado: string;
    imagem: string;
  }>>([]);

  const handleSalvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    if (novoPerfil.nome && novoPerfil.orixa && novoPerfil.nascimento && novoPerfil.batizado && novoPerfil.imagem) {
      const novoPerfilObj = {
        id: Date.now(),
        nome: novoPerfil.nome,
        orixa: novoPerfil.orixa,
        nascimento: novoPerfil.nascimento,
        batizado: novoPerfil.batizado,
        imagem: URL.createObjectURL(novoPerfil.imagem),
      };
      setPerfis([...perfis, novoPerfilObj]);
      setNovoPerfil({ nome: "", orixa: "", nascimento: "", batizado: "", imagem: null });
    }
  };

  return (
    <div className="mt-4 space-y-6 text-left">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-semibold text-left">Adicionar Novo Perfil</h3>
        <PerfilForm
          novoPerfil={novoPerfil}
          onPerfilChange={setNovoPerfil}
          onSubmit={handleSalvarPerfil}
        />
      </div>
      <PerfisList perfis={perfis} />
    </div>
  );
};

export default PerfilTab;
