
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Fronts = () => {
  return (
    <Layout>
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="umbanda" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="umbanda">Frentes Umbanda</TabsTrigger>
              <TabsTrigger value="nacao">Frentes Nação</TabsTrigger>
            </TabsList>
            <TabsContent value="umbanda">
              <div className="mt-4">
                <p>Informações sobre Frentes Umbanda serão adicionadas aqui.</p>
              </div>
            </TabsContent>
            <TabsContent value="nacao">
              <div className="mt-4">
                <p>Informações sobre Frentes Nação serão adicionadas aqui.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Fronts;
