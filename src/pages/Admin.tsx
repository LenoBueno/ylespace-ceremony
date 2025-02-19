
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement proper authentication
    if (credentials.username === "admin" && credentials.password === "admin") {
      setIsAuthenticated(true);
    }
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
          <Tabs defaultValue="perfis" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="perfis">Perfis</TabsTrigger>
              <TabsTrigger value="frentes">Frentes</TabsTrigger>
              <TabsTrigger value="sobre">Sobre</TabsTrigger>
              <TabsTrigger value="inicio">Início</TabsTrigger>
            </TabsList>
            <TabsContent value="perfis">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Gerenciar Perfis</h3>
                {/* TODO: Implementar gestão de perfis */}
              </div>
            </TabsContent>
            <TabsContent value="frentes">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Gerenciar Frentes</h3>
                {/* TODO: Implementar gestão de frentes */}
              </div>
            </TabsContent>
            <TabsContent value="sobre">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Editar Sobre</h3>
                {/* TODO: Implementar edição do sobre */}
              </div>
            </TabsContent>
            <TabsContent value="inicio">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Editar Início</h3>
                {/* TODO: Implementar edição do início */}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Admin;
