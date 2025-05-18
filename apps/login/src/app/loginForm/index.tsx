import React, { useState } from "react";
import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";
import { LoginUseCase } from "../../domain/useCases/login/LoginUseCase";

interface LoginFormProps {
  loginUseCase: LoginUseCase;
}

export default function LoginForm({ loginUseCase }: LoginFormProps) {
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
    <div>
      <div className="flex flex-col items-center  w-[450px] justify-center border-2 border-white p-medium rounded-lg bg-white bg-opacity-10">
        <Text intent="Heading" color="black" style="bold" text="Login"></Text>
        {error.show && (
          <Text
            intent="Regular"
            color="negative"
            style="bold"
            text={error.message}
          ></Text>
        )}
        <form>
          <Text intent="Regular" color="black" style="bold" text="Email"></Text>
          <input
            className="outline outline-1 outline-primary  mb-big mt-medium bg-white rounded-md px-small w-[250px]  py-small text-black text-start flex flex-row hover:cursor-text"
            type="text"
            name="emailname"
            onChange={handleEmailChange}
            color="black"
          ></input>
          <Text intent="Regular" color="black" style="bold" text="Senha"></Text>
          <input
            className="outline outline-1 outline-primary  mb-big mt-medium bg-white rounded-md px-small w-[250px]  py-small text-black text-start flex flex-row hover:cursor-text"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            color="black"
          ></input>
          <div className="flex flex-row justify-center">
            <Button
              intent="primary"
              text="Conectar"
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
