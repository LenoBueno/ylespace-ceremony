
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  console.log("Layout sendo renderizado");
  
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="transition-opacity duration-200 ease-in-out">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
