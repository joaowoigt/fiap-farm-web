import React, { useState } from "react";

import { LoginUseCase } from "../../domain/useCases/login/LoginUseCase";
import LoginFormScreen from "./ui";

interface LoginFormControllerProps {
  loginUseCase: LoginUseCase;
}

export default function LoginFormController({
  loginUseCase,
}: LoginFormControllerProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    show: false,
    message: "Email ou senha invalidos",
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError({ show: true, message: "Preencha os campos para prosseguir" });
      return;
    }
    try {
      const userResult = await loginUseCase.execute(email, password);
      if ("user" in userResult) {
        console.log("Login bem-sucedido", userResult.user);
        setError({ show: false, message: "" });
        window.location.href = "/dashboard";
      } else {
        setError(userResult);
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      setError({ show: true, message: "Erro ao fazer login" });
    }
  };
  return (
    <LoginFormScreen
      onSubmit={onSubmit}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      error={error}
    ></LoginFormScreen>
  );
}
