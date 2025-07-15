import React, { useEffect } from "react";
import RegisterFormScreen from "./ui";
import { useRegister } from "../hooks/useRegister";
import RegisterObserver from "../observers/RegisterObserver";
import {
  validateUserName,
  validateEmail,
  validatePassword,
} from "../observers/Validator";

// Componente simplificado - responsável apenas pela apresentação
export default function RegisterFormController() {
  const {
    email,
    password,
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
    handleUserNameChange,
    handleRegister,
  } = useRegister();

  // Configurar observers para validação em tempo real
  useEffect(() => {
    // Observer para nome de usuário
    const userNameObserver = new RegisterObserver(
      setUserNameError,
      "userNameInput",
      validateUserName,
    );

    // Observer para email
    const emailObserver = new RegisterObserver(
      setEmailError,
      "emailInput",
      validateEmail,
    );

    // Observer para senha
    const passwordObserver = new RegisterObserver(
      setPasswordError,
      "passwordInput",
      validatePassword,
    );

    // Cleanup é feito automaticamente pelos observers
    return () => {
      // Os observers já implementam cleanup interno
    };
  }, [setUserNameError, setEmailError, setPasswordError]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleRegister();
  };
  return (
    <RegisterFormScreen
      onSubmit={onSubmit}
      handleUsernameChange={handleUserNameChange}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      error={
        error ? { show: true, message: error } : { show: false, message: "" }
      }
      userNameError={userNameError}
      emailError={emailError}
      passwordError={passwordError}
      success={success}
      userName={userName}
      email={email}
      password={password}
    />
  );
}
