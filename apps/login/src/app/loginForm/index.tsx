import React, { useState } from "react";
import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";
import { LoginRepositoryImpl } from "../../data/repositories/LoginRepositoryImpl";
import { LoginUseCaseImpl } from "../../domain/useCases/login/LoginUseCaseImpl";

const loginRepository = new LoginRepositoryImpl();
const loginService = new LoginUseCaseImpl(loginRepository);

export default function LoginForm() {
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
    const token = await loginService.execute(email, password);
    if (token) {
      setError({ show: false, message: "" });
      sessionStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } else {
      setError({ show: true, message: "Email ou senha inválidos" });
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
