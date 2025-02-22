
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
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
              <Link to="/home" className="animated-underline">
                Início
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="animated-underline">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/frentes" className="animated-underline">
                Frentes
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin" className="animated-underline">
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
