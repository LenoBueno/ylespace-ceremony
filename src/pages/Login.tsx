
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, AlertCircle, Info } from "lucide-react";

const Login = () => {
  const { login, register, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [registrationData, setRegistrationData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [validationErrors, setValidationErrors] = useState({
    loginEmail: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    if (!email) return "Email é obrigatório";
    if (!email.includes('@') || !email.includes('.')) return "Email inválido";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Senha é obrigatória";
    if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres";
    return "";
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return "Confirmação de senha é obrigatória";
    if (password !== confirmPassword) return "As senhas não coincidem";
    return "";
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    const emailError = validateEmail(credentials.email);
    const passwordError = validatePassword(credentials.password);
    
    setValidationErrors({
      ...validationErrors,
      loginEmail: emailError,
      loginPassword: passwordError,
    });
    
    if (emailError || passwordError) {
      return;
    }
    
    setLoading(true);
    try {
      await login(credentials.email, credentials.password);
    } catch (error: any) {
      console.error("Login error:", error);
      // Toast exibido pelo hook useAuth
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos
    const emailError = validateEmail(registrationData.email);
    const passwordError = validatePassword(registrationData.password);
    const confirmPasswordError = validateConfirmPassword(
      registrationData.password, 
      registrationData.confirmPassword
    );
    
    setValidationErrors({
      ...validationErrors,
      registerEmail: emailError,
      registerPassword: passwordError,
      confirmPassword: confirmPasswordError,
    });
    
    if (emailError || passwordError || confirmPasswordError) {
      return;
    }
    
    setLoading(true);
    try {
      const result = await register(registrationData.email, registrationData.password);
      if (result) {
        setActiveTab("login");
        setCredentials({
          email: registrationData.email,
          password: "",
        });
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      // Toast exibido pelo hook useAuth
    } finally {
      setLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message: string }) => {
    if (!message) return null;
    return (
      <div className="flex items-center mt-1 text-red-500 text-sm">
        <AlertCircle className="h-4 w-4 mr-1" />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md animate-fadeIn">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            Ylê Axé Xangô & Oxum
          </CardTitle>
          <CardDescription className="text-center">
            Sistema de Gerenciamento do Terreiro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={credentials.email}
                      onChange={(e) => {
                        setCredentials({ ...credentials, email: e.target.value });
                        setValidationErrors({
                          ...validationErrors,
                          loginEmail: ""
                        });
                      }}
                      className={validationErrors.loginEmail ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    <ErrorMessage message={validationErrors.loginEmail} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        value={credentials.password}
                        onChange={(e) => {
                          setCredentials({ ...credentials, password: e.target.value });
                          setValidationErrors({
                            ...validationErrors,
                            loginPassword: ""
                          });
                        }}
                        className={validationErrors.loginPassword ? "border-red-500 pr-10" : "pr-10"}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <ErrorMessage message={validationErrors.loginPassword} />
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-md text-sm">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p>Lembre-se de verificar seu email após o registro para ativar sua conta. Se não recebeu, tente fazer login novamente para reenviar.</p>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={loading || authLoading}>
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={registrationData.email}
                      onChange={(e) => {
                        setRegistrationData({ ...registrationData, email: e.target.value });
                        setValidationErrors({
                          ...validationErrors,
                          registerEmail: ""
                        });
                      }}
                      className={validationErrors.registerEmail ? "border-red-500" : ""}
                      disabled={loading}
                    />
                    <ErrorMessage message={validationErrors.registerEmail} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        value={registrationData.password}
                        onChange={(e) => {
                          setRegistrationData({ ...registrationData, password: e.target.value });
                          setValidationErrors({
                            ...validationErrors,
                            registerPassword: ""
                          });
                        }}
                        className={validationErrors.registerPassword ? "border-red-500 pr-10" : "pr-10"}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <ErrorMessage message={validationErrors.registerPassword} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme a senha"
                        value={registrationData.confirmPassword}
                        onChange={(e) => {
                          setRegistrationData({ ...registrationData, confirmPassword: e.target.value });
                          setValidationErrors({
                            ...validationErrors,
                            confirmPassword: ""
                          });
                        }}
                        className={validationErrors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <ErrorMessage message={validationErrors.confirmPassword} />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading || authLoading}>
                  {loading ? "Registrando..." : "Registrar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
