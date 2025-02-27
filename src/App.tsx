
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Fronts from "@/pages/Fronts";
import Ervas from "@/pages/Ervas";
import Banhos from "@/pages/Banhos";
import Profile from "@/pages/Profile";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { useAuth } from "@/hooks/useAuth";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/about"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      />
      <Route
        path="/fronts"
        element={
          <PrivateRoute>
            <Fronts />
          </PrivateRoute>
        }
      />
      <Route
        path="/ervas"
        element={
          <PrivateRoute>
            <Ervas />
          </PrivateRoute>
        }
      />
      <Route
        path="/banhos"
        element={
          <PrivateRoute>
            <Banhos />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
