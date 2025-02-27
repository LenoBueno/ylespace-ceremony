import { useEffect, useState } from 'react';
import queries from '../database/queries';
import { Perfil } from '../database/queries';

export default function Perfis() {
  const [perfis, setPerfis] = useState<Perfil[]>([]);

  useEffect(() => {
    const carregarPerfis = async () => {
      try {
        const data = await queries.getAllPerfis();
        setPerfis(data);
      } catch (error) {
        console.error('Erro ao carregar perfis:', error);
      }
    };

    carregarPerfis();
  }, []);

  return (
    <div>
      {perfis.map(perfil => (
        <div key={perfil.id}>
          <h2>{perfil.nome}</h2>
          <p>Orixá: {perfil.orixa}</p>
          {/* ... outros campos ... */}
        </div>
      ))}
    </div>
  );
} 