
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Ervas = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Ervas Sagradas</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* As ervas serão exibidas aqui quando forem adicionadas */}
        </div>
      </div>
    </Layout>
  );
};

export default Ervas;
