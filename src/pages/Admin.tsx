
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrenteForm from "@/components/admin/FrenteForm";
import FrentesList from "@/components/admin/FrentesList";
import SobreForm from "@/components/admin/SobreForm";
import ErvasForm from "@/components/admin/ErvasForm";
import PerfilForm from "@/components/admin/PerfilForm";
import PerfisList from "@/components/admin/PerfisList";
import BanhoForm from "@/components/admin/BanhoForm";
import BanhosList from "@/components/admin/BanhosList";

const Admin = () => {
  // Estados para frentes
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

  // Estados para ervas
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

  // Estados para perfis
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

  // Estados para banhos
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

  // Estado para a página sobre
  const [sobre, setSobre] = useState({
    texto: "",
    imagem: null as File | null,
  });

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

  // Handlers para Frentes
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

  // Handlers para Ervas
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

  // Handlers para Perfis
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

  // Handlers para Banhos
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

  // Handler para Sobre
  const handleSobreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando sobre:", sobre);
  };

  return (
    <Layout>
      <Card className="text-left">
        <CardHeader className="text-left">
          <CardTitle className="text-left">Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="perfis" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="perfis">Perfis</TabsTrigger>
              <TabsTrigger value="frentes">Frentes</TabsTrigger>
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="banhos">Banhos de Descarga</TabsTrigger>
              <TabsTrigger value="ervas">Ervas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="perfis">
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
            </TabsContent>
            
            <TabsContent value="ervas">
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
            </TabsContent>

            <TabsContent value="frentes">
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
            </TabsContent>

            <TabsContent value="sobre">
              <div className="mt-4 space-y-6 text-left">
                <SobreForm
                  sobre={sobre}
                  onSobreChange={setSobre}
                  onSubmit={handleSobreSubmit}
                />
              </div>
            </TabsContent>

            <TabsContent value="banhos">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Admin;
