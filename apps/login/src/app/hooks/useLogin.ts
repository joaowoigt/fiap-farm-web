import { useState } from "react";
import { AuthController } from "../controllers/AuthController";
import { User } from "../../domain/models/user";
import { encrypt } from "../../data/security/EncryptUtils";

// Hook personalizado para Login seguindo SRP - responsável apenas pelo gerenciamento de estado do login
export function useLogin() {
  const [controller] = useState(() => new AuthController());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError(null); // Clear error when user starts typing
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error) setError(null); // Clear error when user starts typing
  };

  const handleLogin = async (): Promise<boolean> => {
    if (!email || !password) {
      setError("Preencha os campos para prosseguir");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await controller.login(email, password);

      return result.match(
        (user: User) => {
          console.log("Login bem-sucedido", user);
          sessionStorage.setItem("farmUser", encrypt(user.id).encryptedData);
          // Redirect will be handled by the component
          return true;
        },
        (error) => {
          setError(error.message);
          return false;
        }
      );
    } catch (err) {
      console.error("Erro inesperado ao fazer login", err);
      setError("Erro inesperado ao fazer login");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  return {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    resetForm,
  };
}
