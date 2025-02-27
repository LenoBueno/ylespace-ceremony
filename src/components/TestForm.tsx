import { useState, useEffect } from 'react';

export default function TestForm() {
  const [nome, setNome] = useState('');
  const [orixa, setOrixa] = useState('');
  const [perfis, setPerfis] = useState([]);

  // Função para buscar perfis
  const fetchPerfis = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/perfis');
      const data = await response.json();
      setPerfis(data);
    } catch (error) {
      console.error('Erro ao buscar perfis:', error);
    }
  };

  // Chama fetchPerfis quando o componente é montado
  useEffect(() => {
    fetchPerfis();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/perfis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          orixa,
          nascimento: '1990-01-01',
          batizado: '2010-01-01'
        }),
      });

      if (response.ok) {
        alert('Perfil criado com sucesso!');
        setNome('');
        setOrixa('');
        fetchPerfis(); // Atualiza a lista de perfis após a criação
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="border p-2"
          />
        </div>
        <div>
          <input
            type="text"
            value={orixa}
            onChange={(e) => setOrixa(e.target.value)}
            placeholder="Orixá"
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Salvar
        </button>
      </form>

      <div className="mt-8">
        <h2>Perfis Cadastrados:</h2>
        <ul>
          {perfis.map((perfil: any) => (
            <li key={perfil.id}>
              {perfil.nome} - {perfil.orixa}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 