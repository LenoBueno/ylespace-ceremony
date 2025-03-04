
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminTabs from "@/components/admin/AdminTabs";

const Admin = () => {
  return (
    <Layout>
      <Card className="text-left">
        <CardHeader className="text-left">
          <CardTitle className="text-left">Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminTabs />
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Admin;
