
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, just navigate to login
    navigate("/login");
  };

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Ylê Axé Xangô & Oxum
          </h1>
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
              <Link to="/" className="animated-underline">
                Início
              </Link>
            </li>
            <li>
              <Link to="/profile" className="animated-underline">
                Perfil
              </Link>
            </li>
            <li>
              <Link to="/fronts" className="animated-underline">
                Frentes
              </Link>
            </li>
            <li>
              <Link to="/about" className="animated-underline">
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
