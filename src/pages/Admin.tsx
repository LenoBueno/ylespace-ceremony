import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === "root" && credentials.password === "Ftec@148750W559rt") {
      setIsAuthenticated(true);
    }
  };

  const handleImagemFrente = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNovaFrente({ ...novaFrente, imagem: e.target.files[0] });
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Login Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
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
                  <form onSubmit={handleSalvarFrente} className="space-y-4">
                    <div>
                      <Label htmlFor="titulo">Título</Label>
                      <Input
                        id="titulo"
                        value={novaFrente.titulo}
                        onChange={(e) =>
                          setNovaFrente({ ...novaFrente, titulo: e.target.value })
                        }
                        maxLength={50}
                      />
                    </div>
                    <div>
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={novaFrente.descricao}
                        onChange={(e) =>
                          setNovaFrente({ ...novaFrente, descricao: e.target.value })
                        }
                        maxLength={200}
                        className="h-20"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        {novaFrente.descricao.length}/200 caracteres
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="imagem">Imagem</Label>
                      <Input
                        id="imagem"
                        type="file"
                        accept="image/*"
                        onChange={handleImagemFrente}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Salvar Frente
                    </Button>
                  </form>
                </div>

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
              </div>
            </TabsContent>

            <TabsContent value="sobre">
              <div className="mt-4 space-y-6">
                <form onSubmit={handleSobreSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="sobreTexto">Texto</Label>
                    <Textarea
                      id="sobreTexto"
                      value={sobre.texto}
                      onChange={(e) => setSobre({ ...sobre, texto: e.target.value })}
                      className="min-h-[200px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sobreImagem">Imagem (Assinatura)</Label>
                    <Input
                      id="sobreImagem"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files &&
                        setSobre({ ...sobre, imagem: e.target.files[0] })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Salvar Sobre
                  </Button>
                </form>
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
