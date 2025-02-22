import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/admin/LoginForm";
import FrenteForm from "@/components/admin/FrenteForm";
import FrentesList from "@/components/admin/FrentesList";
import SobreForm from "@/components/admin/SobreForm";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const [sobre, setSobre] = useState({
    texto: "",
    imagem: null as File | null,
  });

  const handleLogin = (username: string, password: string) => {
    if (username === "root" && password === "Ftec@148750W559rt") {
      setIsAuthenticated(true);
    }
  };

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

  const handleSobreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Salvando sobre:", sobre);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frentes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="perfis">Perfis</TabsTrigger>
              <TabsTrigger value="frentes">Frentes</TabsTrigger>
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="inicio">Início</TabsTrigger>
            </TabsList>
            
            <TabsContent value="frentes">
              <div className="mt-4 space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-lg font-semibold">Adicionar Nova Frente</h3>
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
              <div className="mt-4 space-y-6">
                <SobreForm
                  sobre={sobre}
                  onSobreChange={setSobre}
                  onSubmit={handleSobreSubmit}
                />
              </div>
            </TabsContent>

            <TabsContent value="inicio">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Editar Início</h3>
              </div>
            </TabsContent>

            <TabsContent value="perfis">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Gerenciar Perfis</h3>
                <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* TODO: Implementar cards de perfis */}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Admin;
