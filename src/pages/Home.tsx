
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Visualize as informações do seu perfil aqui.</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Home;
