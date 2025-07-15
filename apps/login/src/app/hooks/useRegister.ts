import { useState, useEffect } from "react";
import { AuthController } from "../controllers/AuthController";
import { User } from "../../domain/models/user";
import { UiError } from "../../domain/models/uiError";

// Hook personalizado para Register seguindo SRP - responsável apenas pelo gerenciamento de estado do registro
export function useRegister() {
  const [controller] = useState(() => new AuthController());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Estados para validações dos campos usando observers
  const [userNameError, setUserNameError] = useState<UiError>({
    show: false,
    message: "",
  });
  const [emailError, setEmailError] = useState<UiError>({
    show: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState<UiError>({
    show: false,
    message: "",
  });
  // useEffect para esconder a mensagem de sucesso após 5 segundos
  useEffect(() => {
    if (success) {
      console.log("Mensagem de sucesso ativada, será ocultada em 5 segundos");
      const timer = setTimeout(() => {
        console.log("Ocultando mensagem de sucesso");
        setSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError(null);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error) setError(null);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    if (error) setError(null);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
    if (error) setError(null);
  };

  const handleRegister = async (): Promise<boolean> => {
    // Verificar se há erros de validação antes de prosseguir
    if (userNameError.show || emailError.show || passwordError.show) {
      setError("Por favor, corrija os erros nos campos antes de continuar");
      return false;
    }

    // Verificar se os campos estão preenchidos
    if (!userName || !email || !password) {
      setError("Todos os campos são obrigatórios");
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await controller.register(email, password);
      return result.match(
        (user: User) => {
          console.log("Registro bem-sucedido", user);
          console.log("Definindo success como true");
          setSuccess(true);
          resetForm();
          return true;
        },
        (error) => {
          console.log("Erro no registro:", error.message);
          setError(error.message);
          return false;
        }
      );
    } catch (err) {
      console.error("Erro inesperado ao registrar", err);
      setError("Erro inesperado ao registrar");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUserName("");
    setError(null);
    // Não resetar o success aqui para permitir que a mensagem seja exibida
    setUserNameError({ show: false, message: "" });
    setEmailError({ show: false, message: "" });
    setPasswordError({ show: false, message: "" });
  };

  return {
    email,
    password,
    confirmPassword,
    userName,
    loading,
    error,
    success,
    userNameError,
    emailError,
    passwordError,
    setUserNameError,
    setEmailError,
    setPasswordError,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleUserNameChange,
    handleRegister,
    resetForm,
  };
}
