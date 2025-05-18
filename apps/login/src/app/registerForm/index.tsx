import React, { useEffect, useState } from "react";
import { RegisterUseCase } from "../../domain/useCases/register/RegisterUseCase";
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from "../observers/Validator";
import { UiError } from "../../domain/models/uiError";
import RegisterObserver from "../observers/RegisterObserver";
import RegisterFormScreen from "./ui";

interface RegisterFormControllerProps {
  registerUseCase: RegisterUseCase;
}

export default function RegisterFormController({
  registerUseCase,
}: RegisterFormControllerProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "Email ou senha invalidos",
  });

  const [inputError, setInputError] = useState<UiError>({
    show: false,
    message: "O nome de usuário deve ter pelo menos 3 caracteres",
  });

  useEffect(() => {
    const userNameObserver = new RegisterObserver(
      setInputError,
      "userNameInput",
      validateUserName
    );
    const emailObserver = new RegisterObserver(
      setInputError,
      "emailInput",
      validateEmail
    );
    const passwordInput = new RegisterObserver(
      setInputError,
      "passwordInput",
      validatePassword
    );
  }, []);

  const [success, setSuccess] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password || !username) {
      setError({ show: true, message: "Preencha os campos para prosseguir" });
      return;
    }
    try {
      await registerUseCase.execute(email, password);

      setError({
        show: false,
        message: "Preencha os campos para prosseguir",
      });
      setSuccess(true);
    } catch (error: any) {
      console.error(
        "Erro ao registrar usuário na camada de apresentação",
        error
      );
      setError({ show: true, message: error.message });
      setSuccess(false);
    }
  };
  return (
    <RegisterFormScreen
      onSubmit={onSubmit}
      handleUsernameChange={handleUsernameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      error={error}
      inputError={inputError}
      success={success}
    />
  );
}
