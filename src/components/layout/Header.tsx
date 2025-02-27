
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/home" className="text-xl font-semibold hover:opacity-80 transition-opacity">
            Ylê Axé Xangô & Oxum
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="hover:bg-muted"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-4">
          <ul className="flex space-x-6">
            <li>
              <Link to="/home" className="animated-underline">
                Início
              </Link>
            </li>
            <li>
              <Link to="/about" className="animated-underline">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/fronts" className="animated-underline">
                Frentes
              </Link>
            </li>
            <li>
              <Link to="/ervas" className="animated-underline">
                Ervas
              </Link>
            </li>
            <li>
              <Link to="/banhos" className="animated-underline">
                Banhos de Descarga
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
