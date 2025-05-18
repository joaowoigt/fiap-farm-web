import React, { useEffect, useState } from "react";
import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";
import { RegisterUseCase } from "../../domain/useCases/register/RegisterUseCase";
import {
  validateEmail,
  validatePassword,
  validateUserName,
} from "../observers/Validator";
import { UiError } from "../../domain/useCases/models/Error";
import RegisterObserver from "../observers/RegisterObserver";

interface RegisterFormProps {
  registerUseCase: RegisterUseCase;
}

export default function RegisterForm({ registerUseCase }: RegisterFormProps) {
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
    <div>
      <div className="flex flex-col items-center  w-[450px] justify-center border-2 border-white p-medium rounded-lg bg-white bg-opacity-10">
        <Text
          intent="Heading"
          color="black"
          style="bold"
          text="Cadastre-se"
        ></Text>
        {error.show && (
          <Text
            intent="Regular"
            color="negative"
            style="bold"
            text={error.message}
          ></Text>
        )}
        {inputError.show && (
          <Text
            intent="RegultarBorded"
            color="negative"
            style="bold"
            text={inputError.message}
          ></Text>
        )}
        <form>
          <Text intent="Regular" color="black" style="bold" text="Nome"></Text>
          <input
            className="outline outline-1 outline-primary  mb-big mt-medium bg-white rounded-md px-small w-[250px]  py-small text-black text-start flex flex-row hover:cursor-text"
            type="text"
            name="username"
            id="userNameInput"
            onChange={handleUsernameChange}
            color="black"
          ></input>
          <Text intent="Regular" color="black" style="bold" text="Email"></Text>
          <input
            className="outline outline-1 outline-primary  mb-big mt-medium bg-white rounded-md px-small w-[250px]  py-small text-black text-start flex flex-row hover:cursor-text"
            type="text"
            name="emailname"
            id="emailInput"
            onChange={handleEmailChange}
            color="black"
          ></input>
          <Text intent="Regular" color="black" style="bold" text="Senha"></Text>
          <input
            className="outline outline-1 outline-primary  mb-big mt-medium bg-white rounded-md px-small w-[250px]  py-small text-black text-start flex flex-row hover:cursor-text"
            type="password"
            name="password"
            id="passwordInput"
            onChange={handlePasswordChange}
            color="black"
          ></input>
          {success && (
            <Text
              intent="Regular"
              color="black"
              style="bold"
              text="Usuário cadastrado com sucesso"
            ></Text>
          )}
          <div className="flex flex-row justify-center">
            <Button
              intent="primary"
              text="Resgistrar"
              onClick={(event) => {
                onSubmit(event);
              }}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
