
import React from "react";

interface Frente {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
}

interface FrentesListProps {
  frentes: Frente[];
}

const FrentesList = ({ frentes }: FrentesListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {frentes.map((frente) => (
        <div
          key={frente.id}
          className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={frente.imagem}
              alt={frente.titulo}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4">
            <h4 className="mb-2 text-xl font-semibold">{frente.titulo}</h4>
            <p className="text-gray-600">{frente.descricao}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrentesList;
