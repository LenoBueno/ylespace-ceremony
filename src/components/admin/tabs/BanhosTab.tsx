
import React, { useState, useEffect } from "react";
import BanhoForm from "@/components/admin/BanhoForm";
import BanhosList from "@/components/admin/BanhosList";

const BanhosTab = () => {
  const [novoBanho, setNovoBanho] = useState({
    titulo: "",
    subtitulo: "",
    ervasSelecionadas: [] as number[],
    imagem: null as File | null,
  });

  const [banhos, setBanhos] = useState<Array<{
    id: number;
    titulo: string;
    subtitulo: string;
    ervas: string[];
    imagem: string;
  }>>([]);

  const [ervas, setErvas] = useState<Array<{
    id: number;
    titulo: string;
    subtitulo: string;
    texto: string;
    imagem: string;
  }>>([]);

  // Carrega ervas para o formulário de banhos
  useEffect(() => {
    // Simulação de ervas para exibir no checklist
    const ervasLocais = [
      { id: 1, titulo: "Alecrim" },
      { id: 2, titulo: "Arruda" },
      { id: 3, titulo: "Guiné" },
      { id: 4, titulo: "Espada-de-São-Jorge" },
      { id: 5, titulo: "Manjericão" },
      { id: 6, titulo: "Alfazema" },
      { id: 7, titulo: "Hortelã" },
      { id: 8, titulo: "Boldo" },
      { id: 9, titulo: "Eucalipto" },
      { id: 10, titulo: "Poejo" },
    ];
    setErvas(ervasLocais.map(erva => ({
      id: erva.id,
      titulo: erva.titulo,
      subtitulo: "",
      texto: "",
      imagem: "/placeholder.svg"
    })));
  }, []);

  const handleSalvarBanho = (e: React.FormEvent) => {
    e.preventDefault();
    if (novoBanho.titulo && novoBanho.subtitulo && novoBanho.ervasSelecionadas.length > 0 && novoBanho.imagem) {
      // Converter IDs de ervas selecionadas para nomes de ervas
      const ervasSelecionadas = novoBanho.ervasSelecionadas.map(id => {
        const erva = ervas.find(e => e.id === id);
        return erva ? erva.titulo : "";
      }).filter(titulo => titulo !== "");

      const novoBanhoObj = {
        id: Date.now(),
        titulo: novoBanho.titulo,
        subtitulo: novoBanho.subtitulo,
        ervas: ervasSelecionadas,
        imagem: URL.createObjectURL(novoBanho.imagem),
      };
      setBanhos([...banhos, novoBanhoObj]);
      setNovoBanho({ titulo: "", subtitulo: "", ervasSelecionadas: [], imagem: null });
    }
  };

  return (
    <div className="mt-4 space-y-6 text-left">
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-semibold text-left">Adicionar Novo Banho de Descarga</h3>
        <BanhoForm
          novoBanho={novoBanho}
          ervasDisponiveis={ervas}
          onBanhoChange={setNovoBanho}
          onSubmit={handleSalvarBanho}
        />
      </div>
      <BanhosList banhos={banhos} />
    </div>
  );
};

export default BanhosTab;
