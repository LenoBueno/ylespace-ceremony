
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerfilTab from "./tabs/PerfilTab";
import FrentesTab from "./tabs/FrentesTab";
import SobreTab from "./tabs/SobreTab";
import BanhosTab from "./tabs/BanhosTab";
import ErvasTab from "./tabs/ErvasTab";

const AdminTabs = () => {
  return (
    <Tabs defaultValue="perfis" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="perfis">Perfis</TabsTrigger>
        <TabsTrigger value="frentes">Frentes</TabsTrigger>
        <TabsTrigger value="sobre">Sobre</TabsTrigger>
        <TabsTrigger value="banhos">Banhos de Descarga</TabsTrigger>
        <TabsTrigger value="ervas">Ervas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="perfis">
        <PerfilTab />
      </TabsContent>
      
      <TabsContent value="ervas">
        <ErvasTab />
      </TabsContent>

      <TabsContent value="frentes">
        <FrentesTab />
      </TabsContent>

      <TabsContent value="sobre">
        <SobreTab />
      </TabsContent>

      <TabsContent value="banhos">
        <BanhosTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminTabs;
