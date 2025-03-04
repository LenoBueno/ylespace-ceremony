
import React, { useState } from "react";
import FrenteForm from "@/components/admin/FrenteForm";
import FrentesList from "@/components/admin/FrentesList";

const FrentesTab = () => {
  const [novaFrente, setNovaFrente] = useState({
    titulo: "",
    descricao: "",
    imagem: null as File | null,
  });
  
  const [frentes, setFrentes] = useState<Array<{
    id: number;
    titulo: string;
    descricao: string;
    imagem: string;
  }>>([]);

  const handleSalvarFrente = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaFrente.titulo && novaFrente.descricao && novaFrente.imagem) {
      const novaFrenteObj = {
        id: Date.now(),
        titulo: novaFrente.titulo,
        descricao: novaFrente.descricao,
        imagem: URL.createObjectURL(novaFrente.imagem),
      };
      setFrentes([...frentes, novaFrenteObj]);
      setNovaFrente({ titulo: "", descricao: "", imagem: null });
    }
  };

  return (
    <div className="mt-4 space-y-6 text-left">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-semibold text-left">Adicionar Nova Frente</h3>
        <FrenteForm
          novaFrente={novaFrente}
          onFrenteChange={setNovaFrente}
          onSubmit={handleSalvarFrente}
        />
      </div>
      <FrentesList frentes={frentes} />
    </div>
  );
};

export default FrentesTab;
