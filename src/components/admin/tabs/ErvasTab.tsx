
import React, { useState } from "react";
import ErvasForm from "@/components/admin/ErvasForm";

const ErvasTab = () => {
  const [novaErva, setNovaErva] = useState({
    titulo: "",
    subtitulo: "",
    texto: "",
    imagem: null as File | null,
  });

  const [ervas, setErvas] = useState<Array<{
    id: number;
    titulo: string;
    subtitulo: string;
    texto: string;
    imagem: string;
  }>>([]);

  const handleSalvarErva = (e: React.FormEvent) => {
    e.preventDefault();
    if (novaErva.titulo && novaErva.subtitulo && novaErva.texto && novaErva.imagem) {
      const novaErvaObj = {
        id: Date.now(),
        titulo: novaErva.titulo,
        subtitulo: novaErva.subtitulo,
        texto: novaErva.texto,
        imagem: URL.createObjectURL(novaErva.imagem),
      };
      setErvas([...ervas, novaErvaObj]);
      setNovaErva({ titulo: "", subtitulo: "", texto: "", imagem: null });
    }
  };

  return (
    <div className="mt-4 space-y-6 text-left">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-semibold text-left">Adicionar Nova Erva</h3>
        <ErvasForm
          novaErva={novaErva}
          onErvaChange={setNovaErva}
          onSubmit={handleSalvarErva}
        />
      </div>
    </div>
  );
};

export default ErvasTab;
