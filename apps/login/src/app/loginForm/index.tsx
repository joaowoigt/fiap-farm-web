import React from "react";
import LoginFormScreen from "./ui";
import { useLogin } from "../hooks/useLogin";

// Componente simplificado - responsável apenas pela apresentação
export default function LoginFormController() {
  const {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLogin();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await handleLogin();
    if (success) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <LoginFormScreen
      email={email}
      password={password}
      loading={loading}
      error={
        error ? { show: true, message: error } : { show: false, message: "" }
      }
      onSubmit={onSubmit}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
    />
  );
}
