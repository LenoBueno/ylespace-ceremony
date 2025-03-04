
import React, { useState } from "react";
import SobreForm from "@/components/admin/SobreForm";

const SobreTab = () => {
  const [sobre, setSobre] = useState({
    texto: "",
    imagem: null as File | null,
  });

  const handleSobreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando sobre:", sobre);
  };

  return (
    <div className="mt-4 space-y-6 text-left">
      <SobreForm
        sobre={sobre}
        onSobreChange={setSobre}
        onSubmit={handleSobreSubmit}
      />
    </div>
  );
};

export default SobreTab;
